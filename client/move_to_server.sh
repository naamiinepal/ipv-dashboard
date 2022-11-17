#! /bin/sh

SERVER_DIR="../server"
STATIC_DIR="$SERVER_DIR/static"
TEMPLATES_DIR="$SERVER_DIR/templates"

# Load outer files
[ ! -d $TEMPLATES_DIR ] && mkdir $TEMPLATES_DIR
cp build/* $TEMPLATES_DIR/

# Load static files
[ ! -d $STATIC_DIR ] && mkdir $STATIC_DIR
rm -r $STATIC_DIR/css $STATIC_DIR/js
cp -r build/assets/* $STATIC_DIR/
