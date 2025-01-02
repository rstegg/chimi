# Chimi App!

## INSTALL BUN!

- Linux/Mac: `curl -fsSL https://bun.sh/install | bash`
- Windows: `powershell -c "irm bun.sh/install.ps1 | iex"`

## Docker Commands (In backend at the moment)

- docker-compose up --build -d

**Or add these useful aliases to .bash_profile**

## Docker aliases for the chimi app

alias chimi-up='docker-compose up --build -d'
alias chimi-down='docker-compose down'
alias chimi-logs='docker-compose logs -f'
alias chimi-clean='docker-compose down -v --remove-orphans'

## Backend Start:

cd backend && yarn start

## Frontend Start

cd frontend && yarn start
