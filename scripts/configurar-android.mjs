// Ajusta el proyecto Android generado por Capacitor: ID de AdMob, versión y nivel de API exigido por Google Play.
import fs from "node:fs";
const admob = JSON.parse(fs.readFileSync("admob.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const versionCode = parseInt(process.env.VERSION_CODE || "1", 10);

// 1) ID de la app AdMob en el manifiesto
const mf = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(mf, "utf8");
const meta = `<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${admob.appId}"/>`;
if (m.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  m = m.replace(/<meta-data android:name="com\.google\.android\.gms\.ads\.APPLICATION_ID"[^>]*\/>/, meta);
} else {
  m = m.replace(/<application([^>]*)>/, `<application$1>\n        ${meta}`);
}
fs.writeFileSync(mf, m);

// 2) Versión de la app
const bg = "android/app/build.gradle";
let g = fs.readFileSync(bg, "utf8");
g = g.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`).replace(/versionName\s+"[^"]*"/, `versionName "${pkg.version}"`);
fs.writeFileSync(bg, g);

// 3) Nivel de API: Google Play exige targetSdk 36 (Android 16) para apps nuevas
const vg = "android/variables.gradle";
let v = fs.readFileSync(vg, "utf8");
v = v.replace(/compileSdkVersion\s*=\s*\d+/, "compileSdkVersion = 36").replace(/targetSdkVersion\s*=\s*\d+/, "targetSdkVersion = 36");
fs.writeFileSync(vg, v);

console.log(`Android configurado: AdMob ${admob.appId}, versión ${pkg.version} (${versionCode}), targetSdk 36`);
