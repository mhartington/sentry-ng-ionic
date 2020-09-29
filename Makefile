# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=mike-hartington
SENTRY_PROJECT=angular
VERSION=`sentry-cli releases propose-version`
SOURCEMAP_LOCATION?=www
setup_release: config build create_release associate_commits

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps   --rewrite --validate $(SOURCEMAP_LOCATION)

config:
	@echo "version=${VERSION}" > .env

# Deploy targets
build:
	npm run build

deploy: setup_release
		make upload_sourcemaps

