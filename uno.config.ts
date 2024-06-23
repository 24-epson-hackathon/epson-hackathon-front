import { defineConfig, presetWind, presetIcons } from 'unocss';

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons({
      collections: {
        carbon: () =>
          import('@iconify-json/carbon/icons.json').then(i => i.default),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        // @ts-expect-error - missing types
        twemoji: () =>
          import('@iconify-json/twemoji/icons.json').then(i => i.default),
        // @ts-expect-error - missing types
        logos: () =>
          import('@iconify-json/logos/icons.json').then(i => i.default),
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
});
