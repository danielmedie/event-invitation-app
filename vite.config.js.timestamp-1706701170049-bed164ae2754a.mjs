// vite.config.js
import { defineConfig } from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/vite/dist/node/index.js";
import laravel from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/laravel-vite-plugin/dist/index.js";
import react from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/tailwindcss/lib/index.js";
import tailwindNesting from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/tailwindcss/nesting/index.js";

// tailwind.config.js
import forms from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/@tailwindcss/forms/src/index.js";
import typography from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/@tailwindcss/typography/src/index.js";
var tailwind_config_default = {
  darkMode: "class",
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  plugins: [
    forms,
    typography
  ]
};

// vite.config.js
import autoprefixer from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/autoprefixer/lib/autoprefixer.js";
import postcssImport from "file:///C:/xampp/htdocs/event-invitation-app/node_modules/postcss-import/index.js";
var vite_config_default = defineConfig({
  plugins: [
    laravel({
      input: [
        "resources/css/app.css",
        "resources/js/app.jsx"
      ],
      refresh: true
    }),
    react()
  ],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        tailwindNesting(),
        tailwindcss(tailwind_config_default),
        autoprefixer
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAidGFpbHdpbmQuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxceGFtcHBcXFxcaHRkb2NzXFxcXGV2ZW50LWludml0YXRpb24tYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcZXZlbnQtaW52aXRhdGlvbi1hcHBcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hhbXBwL2h0ZG9jcy9ldmVudC1pbnZpdGF0aW9uLWFwcC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IGxhcmF2ZWwgZnJvbSAnbGFyYXZlbC12aXRlLXBsdWdpbic7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCB0YWlsd2luZE5lc3RpbmcgZnJvbSAndGFpbHdpbmRjc3MvbmVzdGluZyc7XG5pbXBvcnQgdGFpbHdpbmRDb25maWcgZnJvbSAnLi90YWlsd2luZC5jb25maWcnO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5pbXBvcnQgcG9zdGNzc0ltcG9ydCBmcm9tICdwb3N0Y3NzLWltcG9ydCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgIGxhcmF2ZWwoe1xuICAgICAgICAgICAgaW5wdXQ6IFtcblx0XHRcdFx0J3Jlc291cmNlcy9jc3MvYXBwLmNzcycsXG4gICAgICAgICAgICAgICAgJ3Jlc291cmNlcy9qcy9hcHAuanN4JyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWZyZXNoOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgICAgcmVhY3QoKSxcblx0XSxcblx0Y3NzOiB7XG5cdFx0cG9zdGNzczoge1xuXHRcdFx0cGx1Z2luczogW1xuXHRcdFx0XHRwb3N0Y3NzSW1wb3J0KCksXG5cdFx0XHRcdHRhaWx3aW5kTmVzdGluZygpLFxuXHRcdFx0XHR0YWlsd2luZGNzcyh0YWlsd2luZENvbmZpZyksXG5cdFx0XHRcdGF1dG9wcmVmaXhlcixcblx0XHRcdF0sXG5cdFx0fSxcblx0fSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxcZXZlbnQtaW52aXRhdGlvbi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHhhbXBwXFxcXGh0ZG9jc1xcXFxldmVudC1pbnZpdGF0aW9uLWFwcFxcXFx0YWlsd2luZC5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L3hhbXBwL2h0ZG9jcy9ldmVudC1pbnZpdGF0aW9uLWFwcC90YWlsd2luZC5jb25maWcuanNcIjtpbXBvcnQgZm9ybXMgZnJvbSAnQHRhaWx3aW5kY3NzL2Zvcm1zJ1xuaW1wb3J0IHR5cG9ncmFwaHkgZnJvbSAnQHRhaWx3aW5kY3NzL3R5cG9ncmFwaHknXG5cbi8qKiBAdHlwZSB7aW1wb3J0KCd0YWlsd2luZGNzcycpLkNvbmZpZ30gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBkYXJrTW9kZTogJ2NsYXNzJyxcbiAgICBjb250ZW50OiBbXG5cdFx0XCIuL3Jlc291cmNlcy8qKi8qLmJsYWRlLnBocFwiLFxuXHRcdFwiLi9yZXNvdXJjZXMvKiovKi5qc1wiLFxuXHRcdFwiLi9yZXNvdXJjZXMvKiovKi57dnVlLGpzLHRzLGpzeCx0c3h9XCIsXG5cdFx0XCIuL25vZGVfbW9kdWxlcy9mbG93Yml0ZS8qKi8qLmpzXCJcbiAgICBdLFxuXHRwbHVnaW5zOiBbXG5cdFx0Zm9ybXMsXG5cdFx0dHlwb2dyYXBoeVxuICAgIF0sXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUyxTQUFTLG9CQUFvQjtBQUNuVSxPQUFPLGFBQWE7QUFDcEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8scUJBQXFCOzs7QUNKa1IsT0FBTyxXQUFXO0FBQ2hVLE9BQU8sZ0JBQWdCO0FBR3ZCLElBQU8sMEJBQVE7QUFBQSxFQUNYLFVBQVU7QUFBQSxFQUNWLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRTtBQUFBLEVBQ0gsU0FBUztBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsRUFDRTtBQUNKOzs7QURWQSxPQUFPLGtCQUFrQjtBQUN6QixPQUFPLG1CQUFtQjtBQUUxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDSixPQUFPO0FBQUEsUUFDZjtBQUFBLFFBQ1k7QUFBQSxNQUNKO0FBQUEsTUFDQSxTQUFTO0FBQUEsSUFDYixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFDYjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZ0JBQWdCO0FBQUEsUUFDaEIsWUFBWSx1QkFBYztBQUFBLFFBQzFCO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
