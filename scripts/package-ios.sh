#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
root="$(pwd)"
output="$root/build/ios"
stage="$(mktemp -d)"
trap 'rm -rf "$stage"' EXIT

xcodebuild -project ios/BFILab.xcodeproj -target BFILab -configuration Release \
  -sdk iphoneos ARCHS=arm64 ONLY_ACTIVE_ARCH=NO CODE_SIGNING_ALLOWED=NO \
  CODE_SIGNING_REQUIRED=NO CONFIGURATION_BUILD_DIR="$stage/products" \
  OBJROOT="$stage/obj" SYMROOT="$stage/sym" build

app="$stage/products/BFILab.app"
plist="$app/Info.plist"
read_plist() { /usr/libexec/PlistBuddy -c "Print :$1" "$plist"; }
version="$(read_plist CFBundleShortVersionString)"
if [[ "${1:-v$version}" != "v$version" ]]; then
  echo "Release tag must match bundle version v$version." >&2
  exit 1
fi
test "$(read_plist CFBundleIdentifier)" = io.github.sieradni.bfilab
test "$(xcrun lipo -archs "$app/BFILab")" = arm64
diff -r site "$app/site"

mkdir -p "$stage/archive/Payload" "$output"
mv "$app" "$stage/archive/Payload/"
archive="$output/BFILab-$version.ipa"
ditto -c -k --norsrc "$stage/archive" "$stage/BFILab.ipa"
mv "$stage/BFILab.ipa" "$archive"
(cd "$output" && shasum -a 256 "BFILab-$version.ipa" > "BFILab-$version.ipa.sha256")
printf 'Packaged %s (%s bytes)\n' "$archive" "$(stat -f %z "$archive")"
