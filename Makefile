NPM_INSTALL = npm install
NPM_RUN = npm run
GULP = gulp

NODE_ENV ?= development
DEBUG ?= starter-kit:* cluster-respawn:*
RELOAD ?= false

export NODE_ENV
export DEBUG
export RELOAD

usage:
	@echo ''
	@echo 'Core tasks                       : Description'
	@echo '--------------------             : -----------'
	@echo 'make setup                       : Install all necessary dependencies'
	@echo 'make dev                         : Start development server (args: RELOAD=true for reloading on changes)'
	@echo 'make build                       : Build all files'
	@echo 'make test                        : Run tests'
	@echo 'make start                       : Start server'
	@echo ''
	@echo 'Additional tasks                 : Description'
	@echo '--------------------             : -----------'
	@echo 'make reload                      : Reload server (when enabled in config)'
	@echo 'make debugger                    : Attach node debugger to the first worker (experimental)'
	@echo 'make clean                       : Clean up any dangling *.tmp files from bad NPM installs, old packages'

	@echo ''

# ---
# ## Setup
node_modules:
	@$(NPM_INSTALL)

config/development.json:
	cp config/development.example.json config/development.json

.PHONY: setup
setup:  gulp-global config/development.json node_modules

# ---
# ## Development tasks

.PHONY: dev
dev:
	@$(GULP) dev-watch

.PHONY: debugger
debugger:
	@ls worker-*.pid | head -n 1 | xargs cat | xargs kill -SIGUSR1

# ---
# ## Building
.PHONY: build
build:
	@$(GULP) build

# ---
# ## Testing

.PHONY: test
test: build
	@$(NPM_RUN) test

# ---
# ## Production tasks

.PHONY: start
start: build
	@$(NPM_RUN) start

.PHONY: reload
reload:
	@cat master.pid | xargs kill -SIGUSR2

# ---
# ## Dependency Management
.PHONY: gulp-global
gulp-global:
	@$(NPM_INSTALL) -g gulp

# ---
# ## Housekeeping
.PHONY: clean
clean:
	@$(NPM_INSTALL) -g rimraf
	@rimraf node_modules
