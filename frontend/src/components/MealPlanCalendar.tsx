import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Button, Form, Input, Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../config/axios"; // Axios instance

interface MealPlan {
  id: string;
  name: string;
  date: string; // ISO 8601 formatted date string
  details?: string;
  items: Record<string, any>; // JSON for meal items
  mealType?: string; // "Breakfast", "Lunch", or "Dinner"
}

enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
}

type MealTypeOption = {
  value: MealType;
  label: MealType;
};

const MealPlanCalendar: React.FC = () => {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingMealPlan, setEditingMealPlan] = useState<MealPlan | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const mealOptions: MealTypeOption[] = [
    { value: MealType.Breakfast, label: MealType.Breakfast },
    { value: MealType.Lunch, label: MealType.Lunch },
    { value: MealType.Dinner, label: MealType.Dinner },
  ];

  const fetchMealPlans = async () => {
    try {
      const response = await apiClient.get("/mealplans");
      setMealPlans(response.data);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  };

  const handleModalOpen = (date?: string, mealPlan?: MealPlan) => {
    setSelectedDate(date || null);
    setEditingMealPlan(mealPlan || null);
    form.resetFields();
    if (mealPlan) {
      form.setFieldsValue({
        name: mealPlan.name,
        details: mealPlan.details,
        items: JSON.stringify(mealPlan.items, null, 2),
        mealType: mealPlan.mealType,
      });
    }
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingMealPlan(null);
    setSelectedDate(null);
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const items = JSON.parse(values.items || "{}");

      let dateWithMealType = selectedDate || editingMealPlan?.date;

      // Save the meal plan with meal type (Breakfast, Lunch, Dinner)
      if (editingMealPlan) {
        await apiClient.put(`/mealplans/${editingMealPlan.id}`, {
          name: values.name,
          details: values.details,
          date: dateWithMealType,
          items,
          mealType: values.mealType,
        });
        // @ts-ignore
        setMealPlans((prev) =>
          prev.map((plan) =>
            plan.id === editingMealPlan.id
              ? {
                  ...plan,
                  name: values.name,
                  details: values.details,
                  date: dateWithMealType,
                  items,
                  mealType: values.mealType,
                }
              : plan
          )
        );
      } else {
        const response = await apiClient.post("/mealplans", {
          name: values.name,
          details: values.details,
          date: dateWithMealType,
          items,
          mealType: values.mealType,
        });
        setMealPlans((prev) => [...prev, response.data]);
      }
      handleModalClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Invalid JSON format for items.");
    }
  };

  const handleEventClick = (info: EventClickArg) => {
    const mealPlan = mealPlans.find((plan) => plan.id === info.event.id);
    if (mealPlan) {
      handleModalOpen(undefined, mealPlan);
    }
  };

  const handleDateClick = (info: any) => {
    handleModalOpen(info.dateStr);
  };

  const handleEventDrop = async (info: EventDropArg) => {
    const mealPlan = mealPlans.find((plan) => plan.id === info.event.id);
    if (mealPlan) {
      try {
        const updatedMealPlan = {
          ...mealPlan,
          date: info.event.startStr,
        };
        await apiClient.put(`/mealplans/${mealPlan.id}`, updatedMealPlan);
        setMealPlans((prev) =>
          prev.map((plan) => (plan.id === mealPlan.id ? updatedMealPlan : plan))
        );
      } catch (error) {
        console.error("Error updating meal plan:", error);
        info.revert();
      }
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return (
    <div className="calendar-wrapper">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={mealPlans.map((plan) => ({
          id: plan.id,
          title: `${plan.name} (${plan.mealType})`,
          start: plan.date,
        }))}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
      />
      <Modal
        title={editingMealPlan ? "Edit Meal Plan" : "Create Meal Plan"}
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Meal Type"
            name="mealType"
            rules={[{ required: true, message: "Please select a meal type" }]}
          >
            <Radio.Group
              block
              options={mealOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item label="Description" name="details">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Items (JSON Format)"
            name="items"
            rules={[
              {
                validator: (_, value) => {
                  try {
                    JSON.parse(value || "{}");
                    return Promise.resolve();
                  } catch {
                    return Promise.reject("Invalid JSON format");
                  }
                },
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingMealPlan ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MealPlanCalendar;
