const nextConfig = (await import('./next.config.js')).default;

const hasLocaleInPath = (path) => {
    return nextConfig.i18n.locales.some(locale => path.startsWith('/' + locale));
};

const tryPath = (path, prefix) => {
    const [_, ...segs] = path.split('/');
    if (hasLocaleInPath(path)) {
        return segs.slice(1).join('/').startsWith(prefix);
    } else {
        return segs.join('/').startsWith(prefix);
    }
}

const languageSpecificTags = {
    "en": [],
    "es": [],
    "pt-br": [],
    "de": [],
    "fr": [],
    "he": [],
    "ja": ["lang_ja", "mincho", "kaku gothic", "maru gothic", "tegaki", "fude", "poppu", "kawaii", "manga"],
    "it": [],
    "nl": [],
    "ru": [],
    "tr": [],
    "id": [],
    "zh-cn": ["lang_zh-hans", "lang_zh-hant", "songti", "heiti", "kaiti", "shouxie", "maobi", "meishuti"],
    "zh-tw": ["lang_zh-hant", "lang_zh-hans", "songti", "heiti", "kaiti", "shouxie", "maobi", "meishuti"],
    "ko": [
        "lang_ko",
        "dotum",
        "batang",
        "songeulssi",
        "jangsikche",
        // "piksellche",
        // "gojeonche",
        // "talnemo",
        "kaelriponteu",
        "kodingche",
        // "gungsuhche"
    ],
    "ar": [],
    "sv": []
};


/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://' + process.env.NEXT_PUBLIC_DOMAIN_NAME,
    alternateRefs: nextConfig.i18n.locales.map((locale) => {
        return {
            href: 'https://' + process.env.NEXT_PUBLIC_DOMAIN_NAME + '/' + locale,
            hreflang: locale,
        };
    }),

    additionalPaths: async (config,) => {
        console.log({languageSpecificTags});

        const result = [];
        Object.keys(languageSpecificTags).map(locale => {
            languageSpecificTags[locale].map((tag) => {
                // all possible values
                result.push({
                    loc: `/${locale}/tag/${tag}`,
                    changefreq: config.changefreq,
                    priority: config.priority,
                    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
                });
            });
        });

        return result;
    },

    // This is the workaround from https://stackoverflow.com/a/77276071/1922857
    transform: (config, path) => {
        console.log({path});

        let noAlternateRefs = false;

        // The first few fields are given their default values as seen on:
        // https://github.com/iamvishnusankar/next-sitemap#custom-transformation-function
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,

            // This is where the alternate urls are fixed
            alternateRefs: noAlternateRefs ? [] : config.alternateRefs.map((alternate) => {
                // No need to change the path for the default locale
                if (!hasLocaleInPath(path)) {
                    return alternate
                }

                // console.log(path);

                return {
                    ...alternate,
                    // Note: The alternate.href already includes the locale so removing
                    // the locale from the path to avoid dual locales.
                    // "/sv/editor"
                    href: alternate.href + "/" +  path.split("/").slice(2).join("/"),
                    hrefIsAbsolute: true,
                };
            })
        };
    },

    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                disallow: [
                    '/api',
                    '/dash',
                    '/auth/verify-request',
                    '/ss',
                    '/redirect',
                ]
            },
        ],
        additionalSitemaps: [

        ],
    },
};

export default config;
