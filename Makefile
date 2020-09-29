# Must have `sentry-cli` installed globally
# Following variable must be passed in
#  SENTRY_AUTH_TOKEN

SENTRY_ORG=mike-hartington
SENTRY_PROJECT=angular
VERSION=`sentry-cli releases propose-version`
SOURCEMAP_LOCATION?=www

setup_release: build create_release associate_commits

create_release:
	sentry-cli releases -o $(SENTRY_ORG) new -p $(SENTRY_PROJECT) $(VERSION)

associate_commits:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) set-commits --local $(VERSION)

upload_sourcemaps:
	sentry-cli releases -o $(SENTRY_ORG) -p $(SENTRY_PROJECT) files \
		$(VERSION) upload-sourcemaps --url-prefix $(URL_PREFIX) --rewrite --validate $(SOURCEMAP_LOCATION)


# Deploy targets
build:
	npm run build
	# make upload
	# npm run build && \
		make upload_sourcemaps

deploy_web: setup_release
		URL_PREFIX="~/" make upload_sourcemaps

deploy_android:setup_release
		URL_PREFIX="http://localhost/" make upload_sourcemaps

deploy_ios:setup_release
		URL_PREFIX="capacitor://localhost/" make upload_sourcemaps
