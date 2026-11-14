// Ready-made link sets: profession profiles plus shared section packs.
// A profile adds its own sections; packs (AI, Google, Fun, Social) can be added to any profile.
// Loaded after features.js and uses its helpers (addLinksToSections, refreshAll, createOptionButton...).

Object.assign(translations.ru, {
    presetsTitle: 'Готовые наборы',
    presetsWelcome: 'Добро пожаловать! С чего начнём?',
    presetsLead: 'Выберите, чем вы занимаетесь, и отметьте общие разделы. Можно выбрать несколько профилей.',
    presetsWelcomeLead: 'Выберите профиль, и страница сразу заполнится нужными сервисами. Всё можно поменять потом.',
    presetsProfiles: 'Профиль',
    presetsPacks: 'Общие разделы',
    presetsSummary: 'Будет добавлено: разделов {sections}, ссылок {links}',
    presetsApply: 'Добавить',
    presetsStart: 'Начать',
    presetsSkip: 'Пропустить',
    presetsNothing: 'Выберите хотя бы один профиль или раздел',
    presetsOpen: 'Готовые наборы ссылок',
    presetsOpenHint: 'Разделы для дизайнера, разработчика, маркетолога и других',
    linksCount: '{count} ссылок'
});

Object.assign(translations.en, {
    presetsTitle: 'Ready-made sets',
    presetsWelcome: 'Welcome! Where do we start?',
    presetsLead: 'Pick what you do and tick the shared sections. You can pick several profiles.',
    presetsWelcomeLead: 'Pick a profile and the page fills with the services you need. You can change everything later.',
    presetsProfiles: 'Profile',
    presetsPacks: 'Shared sections',
    presetsSummary: '{sections} sections, {links} links will be added',
    presetsApply: 'Add',
    presetsStart: 'Start',
    presetsSkip: 'Skip',
    presetsNothing: 'Pick at least one profile or section',
    presetsOpen: 'Ready-made link sets',
    presetsOpenHint: 'Sections for designers, developers, marketers and more',
    linksCount: '{count} links'
});

Object.assign(translations.ru, {
    presetsRegion: 'Регион',
    regionRu: 'Россия',
    regionEu: 'Европа',
    presetsBy: 'от Apeex',
    presetsRegionHint: 'Сайты для автолюбителей подобраны под регион. Он определён по языку и часовому поясу, его можно сменить.'
});

Object.assign(translations.en, {
    presetsRegion: 'Region',
    regionRu: 'Russia',
    regionEu: 'Europe',
    presetsBy: 'by Apeex',
    presetsRegionHint: 'Car sites are picked for your region. It is guessed from your language and time zone, and you can change it.'
});

// Address of the Apeex Drive page. While it is empty the app is not linked, so nobody is sent to a page that does not exist.
const APEEX_DRIVE_URL = '';

// A link is [name, url] or [name, url, 'ru'] for services that only make sense in that language
const LINK_SECTIONS = {
    ai: { ru: 'AI', en: 'AI', links: [
        ['ChatGPT', 'https://chatgpt.com'],
        ['Claude', 'https://claude.ai'],
        ['Gemini', 'https://gemini.google.com'],
        ['Perplexity', 'https://www.perplexity.ai'],
        ['Grok', 'https://grok.com'],
        ['DeepSeek', 'https://chat.deepseek.com'],
        ['Copilot', 'https://copilot.microsoft.com'],
        ['Le Chat', 'https://chat.mistral.ai']
    ] },
    google: { ru: 'Google', en: 'Google', links: [
        ['Gmail', 'https://mail.google.com'],
        ['Drive', 'https://drive.google.com'],
        ['Calendar', 'https://calendar.google.com'],
        ['Meet', 'https://meet.google.com'],
        ['Docs', 'https://docs.google.com/document'],
        ['Sheets', 'https://docs.google.com/spreadsheets'],
        ['Translate', 'https://translate.google.com'],
        ['Maps', 'https://www.google.com/maps'],
        ['Photos', 'https://photos.google.com'],
        ['YouTube', 'https://www.youtube.com']
    ] },
    fun: { ru: 'Развлечения', en: 'Fun', links: [
        ['YouTube', 'https://www.youtube.com'],
        ['Netflix', 'https://www.netflix.com'],
        ['Кинопоиск', 'https://hd.kinopoisk.ru', 'ru'],
        ['Spotify', 'https://open.spotify.com'],
        ['Twitch', 'https://www.twitch.tv'],
        ['Prime Video', 'https://www.primevideo.com'],
        ['Disney+', 'https://www.disneyplus.com'],
        ['Apple TV', 'https://tv.apple.com'],
        ['Max', 'https://www.max.com'],
        ['Crunchyroll', 'https://www.crunchyroll.com'],
        ['Steam', 'https://store.steampowered.com'],
        ['Reddit', 'https://www.reddit.com']
    ] },
    social: { ru: 'Соцсети', en: 'Social', links: [
        ['Telegram', 'https://web.telegram.org'],
        ['WhatsApp', 'https://web.whatsapp.com'],
        ['VK', 'https://vk.com', 'ru'],
        ['Instagram', 'https://www.instagram.com'],
        ['X', 'https://x.com'],
        ['Facebook', 'https://www.facebook.com'],
        ['LinkedIn', 'https://www.linkedin.com'],
        ['Threads', 'https://www.threads.net'],
        ['TikTok', 'https://www.tiktok.com'],
        ['Pinterest', 'https://www.pinterest.com']
    ] },
    design: { ru: 'Дизайн', en: 'Design', links: [
        ['Figma', 'https://www.figma.com/files'],
        ['Canva', 'https://www.canva.com'],
        ['Framer', 'https://framer.com/projects'],
        ['Webflow', 'https://webflow.com/dashboard'],
        ['Adobe Express', 'https://express.adobe.com'],
        ['Midjourney', 'https://www.midjourney.com'],
        ['Photopea', 'https://www.photopea.com']
    ] },
    inspiration: { ru: 'Вдохновение и ресурсы', en: 'Inspiration & assets', links: [
        ['Dribbble', 'https://dribbble.com'],
        ['Behance', 'https://www.behance.net'],
        ['Pinterest', 'https://www.pinterest.com'],
        ['Unsplash', 'https://unsplash.com'],
        ['Google Fonts', 'https://fonts.google.com'],
        ['Coolors', 'https://coolors.co'],
        ['Remove.bg', 'https://www.remove.bg'],
        ['Squoosh', 'https://squoosh.app']
    ] },
    code: { ru: 'Код', en: 'Code', links: [
        ['GitHub', 'https://github.com'],
        ['GitLab', 'https://gitlab.com'],
        ['Stack Overflow', 'https://stackoverflow.com'],
        ['MDN', 'https://developer.mozilla.org'],
        ['npm', 'https://www.npmjs.com'],
        ['Cursor', 'https://cursor.com'],
        ['Replit', 'https://replit.com'],
        ['CodePen', 'https://codepen.io']
    ] },
    deploy: { ru: 'Деплой и инфраструктура', en: 'Deploy & infra', links: [
        ['Vercel', 'https://vercel.com/dashboard'],
        ['Netlify', 'https://app.netlify.com'],
        ['Railway', 'https://railway.com/dashboard'],
        ['Supabase', 'https://supabase.com/dashboard'],
        ['Firebase', 'https://console.firebase.google.com'],
        ['Cloudflare', 'https://dash.cloudflare.com'],
        ['Docker Hub', 'https://hub.docker.com'],
        ['Sentry', 'https://sentry.io'],
        ['Postman', 'https://web.postman.co']
    ] },
    analytics: { ru: 'Аналитика', en: 'Analytics', links: [
        ['Google Analytics', 'https://analytics.google.com'],
        ['Search Console', 'https://search.google.com/search-console'],
        ['Tag Manager', 'https://tagmanager.google.com'],
        ['Looker Studio', 'https://lookerstudio.google.com'],
        ['Semrush', 'https://www.semrush.com'],
        ['Ahrefs', 'https://app.ahrefs.com'],
        ['Similarweb', 'https://www.similarweb.com']
    ] },
    promotion: { ru: 'Продвижение', en: 'Promotion', links: [
        ['Google Ads', 'https://ads.google.com'],
        ['Meta Business', 'https://business.facebook.com'],
        ['HubSpot', 'https://app.hubspot.com'],
        ['Mailchimp', 'https://mailchimp.com'],
        ['Brevo', 'https://app.brevo.com'],
        ['Buffer', 'https://buffer.com'],
        ['Canva', 'https://www.canva.com']
    ] },
    tasks: { ru: 'Задачи', en: 'Tasks', links: [
        ['Notion', 'https://www.notion.so'],
        ['Jira', 'https://www.atlassian.com/software/jira'],
        ['Linear', 'https://linear.app'],
        ['Trello', 'https://trello.com'],
        ['Asana', 'https://app.asana.com'],
        ['ClickUp', 'https://app.clickup.com'],
        ['monday', 'https://monday.com'],
        ['Airtable', 'https://airtable.com']
    ] },
    meetings: { ru: 'Общение', en: 'Communication', links: [
        ['Slack', 'https://app.slack.com'],
        ['Zoom', 'https://zoom.us'],
        ['Meet', 'https://meet.google.com'],
        ['Teams', 'https://teams.microsoft.com'],
        ['Miro', 'https://miro.com/app/dashboard'],
        ['Loom', 'https://www.loom.com'],
        ['Calendly', 'https://calendly.com']
    ] },
    study: { ru: 'Учёба', en: 'Study', links: [
        ['Classroom', 'https://classroom.google.com'],
        ['Scholar', 'https://scholar.google.com'],
        ['Wikipedia', 'https://wikipedia.org'],
        ['Coursera', 'https://www.coursera.org'],
        ['Udemy', 'https://www.udemy.com'],
        ['Khan Academy', 'https://www.khanacademy.org'],
        ['Duolingo', 'https://www.duolingo.com'],
        ['Quizlet', 'https://quizlet.com']
    ] },
    writing: { ru: 'Тексты', en: 'Writing', links: [
        ['Docs', 'https://docs.google.com/document'],
        ['Notion', 'https://www.notion.so'],
        ['Grammarly', 'https://app.grammarly.com'],
        ['DeepL', 'https://www.deepl.com/translator'],
        ['Translate', 'https://translate.google.com'],
        ['Overleaf', 'https://www.overleaf.com']
    ] },
    studio: { ru: 'Студия', en: 'Studio', links: [
        ['YouTube Studio', 'https://studio.youtube.com'],
        ['TikTok Studio', 'https://www.tiktok.com/tiktokstudio'],
        ['Instagram', 'https://www.instagram.com'],
        ['Twitch', 'https://dashboard.twitch.tv'],
        ['Patreon', 'https://www.patreon.com'],
        ['Buffer', 'https://buffer.com']
    ] },
    games: { ru: 'Игры', en: 'Games', links: [
        ['Steam', 'https://store.steampowered.com'],
        ['Epic Games', 'https://store.epicgames.com'],
        ['GOG', 'https://www.gog.com'],
        ['Xbox', 'https://www.xbox.com'],
        ['PlayStation', 'https://store.playstation.com'],
        ['Nintendo', 'https://www.nintendo.com'],
        ['Battle.net', 'https://battle.net'],
        ['EA', 'https://www.ea.com'],
        ['Ubisoft', 'https://store.ubisoft.com'],
        ['GeForce NOW', 'https://play.geforcenow.com'],
        ['Humble Bundle', 'https://www.humblebundle.com'],
        ['itch.io', 'https://itch.io']
    ] },
    gamestream: { ru: 'Стримы и сообщество', en: 'Streams & community', links: [
        ['Twitch', 'https://www.twitch.tv'],
        ['Kick', 'https://kick.com'],
        ['YouTube Gaming', 'https://www.youtube.com/gaming'],
        ['Discord', 'https://discord.com/app'],
        ['Reddit', 'https://www.reddit.com/r/gaming'],
        ['FACEIT', 'https://www.faceit.com'],
        ['SteamDB', 'https://steamdb.info'],
        ['IGN', 'https://www.ign.com']
    ] },
    create: { ru: 'Создание контента', en: 'Content tools', links: [
        ['Canva', 'https://www.canva.com'],
        ['CapCut', 'https://www.capcut.com'],
        ['Descript', 'https://www.descript.com'],
        ['ElevenLabs', 'https://elevenlabs.io'],
        ['Runway', 'https://app.runwayml.com'],
        ['Midjourney', 'https://www.midjourney.com'],
        ['Adobe Express', 'https://express.adobe.com']
    ] },
    // Car enthusiast: each section has links per region (ru = Russia, eu = Europe) and optional links for everyone
    // Added to every set by default (a visible, removable chip in the picker)
    apeex: { ru: 'Apeex', en: 'Apeex', links: [
        ['Apeex', 'https://apeex.io/ru', 'ru'],
        ['Apeex', 'https://apeex.io/en', 'en']
    ] },
    // Car-only; stays empty (and is skipped) until APEEX_DRIVE_URL is set
    autoDrive: { ru: 'Apeex Drive', en: 'Apeex Drive', links: [] },
    autoBuy: { ru: 'Покупка и проверка', en: 'Buy, sell & check', regions: {
        ru: [
            ['Auto.ru', 'https://auto.ru'],
            ['Drom', 'https://www.drom.ru'],
            ['Авито Авто', 'https://www.avito.ru/rossiya/avtomobili'],
            ['Автотека', 'https://autoteka.ru'],
            ['Проверка ГИБДД', 'https://xn--90adear.xn--p1ai'],
            ['РСА (ОСАГО)', 'https://autoins.ru'],
            ['Госуслуги', 'https://www.gosuslugi.ru']
        ],
        eu: [
            ['mobile.de', 'https://www.mobile.de'],
            ['AutoScout24', 'https://www.autoscout24.com'],
            ['Autotrader', 'https://www.autotrader.co.uk'],
            ['Otomoto', 'https://www.otomoto.pl'],
            ['Leboncoin', 'https://www.leboncoin.fr'],
            ['carVertical', 'https://www.carvertical.com'],
            ['HPI Check', 'https://www.hpicheck.com']
        ]
    } },
    autoMedia: { ru: 'Медиа и клубы', en: 'News & clubs', regions: {
        ru: [
            ['Drive2', 'https://www.drive2.ru'],
            ['За рулём', 'https://www.zr.ru'],
            ['Колёса.ру', 'https://www.kolesa.ru'],
            ['Autonews', 'https://www.autonews.ru'],
            ['Motor.ru', 'https://motor.ru'],
            ['Авторевю', 'https://www.autoreview.ru'],
            ['Авто Mail', 'https://auto.mail.ru']
        ],
        eu: [
            ['Auto Express', 'https://www.autoexpress.co.uk'],
            ['Top Gear', 'https://www.topgear.com'],
            ['Autocar', 'https://www.autocar.co.uk'],
            ['Motor1', 'https://www.motor1.com'],
            ['Autoevolution', 'https://www.autoevolution.com'],
            ['ADAC', 'https://www.adac.de'],
            ['auto motor und sport', 'https://www.auto-motor-und-sport.de'],
            ['Euro NCAP', 'https://www.euroncap.com']
        ]
    } },
    autoParts: { ru: 'Запчасти', en: 'Parts', regions: {
        ru: [
            ['Exist', 'https://exist.ru'],
            ['Emex', 'https://emex.ru'],
            ['Autopiter', 'https://autopiter.ru'],
            ['Elcats', 'https://www.elcats.ru'],
            ['7zap', 'https://7zap.com']
        ],
        eu: [
            ['Autodoc', 'https://www.autodoc.eu'],
            ['Oscaro', 'https://www.oscaro.com'],
            ['Euro Car Parts', 'https://www.eurocarparts.com'],
            ['RealOEM', 'https://www.realoem.com'],
            ['7zap', 'https://7zap.com']
        ]
    } },
    autoManuals: { ru: 'Схемы и мануалы', en: 'Manuals & diagrams', links: [
        ['Haynes', 'https://www.haynes.com'],
        ['ALLDATA DIY', 'https://www.alldata.com/us/en/do-it-yourself-auto-repair'],
        ['ManualsLib', 'https://www.manualslib.com'],
        ['OBD Codes', 'https://www.obd-codes.com']
    ] }
};

// Profiles: own sections + shared packs ticked by default
const LINK_PROFILES = [
    { id: 'everyday', ru: 'На каждый день', en: 'Everyday', sections: [], packs: ['ai', 'google', 'fun', 'social'] },
    { id: 'auto', ru: 'Автолюбитель', en: 'Car enthusiast', sections: ['autoDrive', 'autoBuy', 'autoMedia', 'autoParts', 'autoManuals'], packs: ['ai', 'google'], by: 'apeex', regional: true },
    { id: 'designer', ru: 'Дизайнер', en: 'Designer', sections: ['design', 'inspiration'], packs: ['ai', 'google'] },
    { id: 'developer', ru: 'Разработчик', en: 'Developer', sections: ['code', 'deploy'], packs: ['ai', 'google'] },
    { id: 'marketer', ru: 'Маркетолог', en: 'Marketer', sections: ['analytics', 'promotion'], packs: ['ai', 'google', 'social'] },
    { id: 'manager', ru: 'Менеджер', en: 'Manager', sections: ['tasks', 'meetings'], packs: ['ai', 'google'] },
    { id: 'student', ru: 'Студент', en: 'Student', sections: ['study', 'writing'], packs: ['ai', 'fun'] },
    { id: 'gamer', ru: 'Геймер', en: 'Gamer', sections: ['games', 'gamestream'], packs: ['fun', 'social'] },
    { id: 'creator', ru: 'Автор контента', en: 'Creator', sections: ['studio', 'create'], packs: ['ai', 'social', 'fun'] }
];

const SHARED_PACKS = ['ai', 'google', 'fun', 'social', 'apeex'];

function presetLang() {
    return currentLanguage === 'ru' || currentLanguage === 'uk' || currentLanguage === 'bg' || currentLanguage === 'sr' ? 'ru' : 'en';
}

function sectionTitle(key) {
    return LINK_SECTIONS[key][presetLang()];
}

// Region for the car sets: 'ru' (Russia, Belarus, Kazakhstan) or 'eu' (Europe and the rest). Guessed locally from the
// time zone and interface language, nothing is sent anywhere; the picker lets the person change it.
let presetRegion = 'eu';

const RU_REGION_TIMEZONES = /^(Europe\/(Moscow|Kaliningrad|Samara|Volgograd|Saratov|Kirov|Astrakhan|Ulyanovsk|Minsk)|Asia\/(Yekaterinburg|Omsk|Novosibirsk|Barnaul|Tomsk|Novokuznetsk|Krasnoyarsk|Irkutsk|Chita|Yakutsk|Khandyga|Vladivostok|Ust-Nera|Magadan|Sakhalin|Srednekolymsk|Kamchatka|Anadyr|Almaty|Qostanay|Aqtau|Aqtobe|Atyrau|Oral|Qyzylorda))$/;

function detectPresetRegion() {
    let zone = '';
    try {
        zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch (e) {
        // No Intl: fall back to the language
    }
    if (RU_REGION_TIMEZONES.test(zone)) return 'ru';
    return currentLanguage === 'ru' ? 'ru' : 'eu';
}

function sectionLinks(key) {
    const lang = presetLang();
    const section = LINK_SECTIONS[key];
    const links = [...((section.regions && section.regions[presetRegion]) || []), ...(section.links || [])];
    if (key === 'autoDrive' && APEEX_DRIVE_URL) links.push(['Apeex Drive', APEEX_DRIVE_URL]);
    return links.filter(([, , onlyLang]) => !onlyLang || onlyLang === lang);
}

// Profiles' own sections first (in the order picked), then shared packs in their fixed order
function collectPresetSections(profileIds, packIds) {
    const keys = [];
    profileIds.forEach(id => {
        const profile = LINK_PROFILES.find(p => p.id === id);
        profile.sections.forEach(key => { if (!keys.includes(key)) keys.push(key); });
    });
    SHARED_PACKS.forEach(key => { if (packIds.includes(key) && !keys.includes(key)) keys.push(key); });
    return keys.filter(key => sectionLinks(key).length);
}

function presetLinksFor(sectionKeys) {
    const links = [];
    sectionKeys.forEach(key => {
        const category = sectionTitle(key);
        sectionLinks(key).forEach(([name, url]) => links.push({ name, url, category }));
    });
    return links;
}

function iconStrip(urls) {
    const strip = document.createElement('span');
    strip.className = 'preset-icons';
    urls.slice(0, 4).forEach(url => {
        const icon = document.createElement('span');
        icon.className = 'preset-mini-icon';
        loadFavicon(url, icon);
        strip.appendChild(icon);
    });
    return strip;
}

// welcome = first run: applying replaces the demo links instead of adding to them
function showLinkPresets(welcome) {
    presetRegion = detectPresetRegion();
    const content = document.getElementById('import-content');
    document.getElementById('import-modal-title').textContent = t(welcome ? 'presetsWelcome' : 'presetsTitle');
    content.innerHTML = '';

    const lead = document.createElement('p');
    lead.className = 'import-summary';
    lead.textContent = t(welcome ? 'presetsWelcomeLead' : 'presetsLead');
    content.appendChild(lead);

    const selectedProfiles = new Set();
    const selectedPacks = new Set();

    const profileLabel = document.createElement('div');
    profileLabel.className = 'section-label';
    profileLabel.textContent = t('presetsProfiles');
    const profileGrid = document.createElement('div');
    profileGrid.className = 'profile-grid';
    let autoCard = null;
    let autoProfile = null;
    const profileUrls = (profile) => (profile.sections.length ? profile.sections : profile.packs).flatMap(key => sectionLinks(key).map(l => l[1]));
    LINK_PROFILES.forEach(profile => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'profile-card';
        card.setAttribute('aria-pressed', 'false');
        const keys = profile.sections.length ? profile.sections : profile.packs;
        const title = document.createElement('span');
        title.className = 'profile-name';
        title.textContent = profile[presetLang()];
        if (profile.by) {
            const tag = document.createElement('span');
            tag.className = 'profile-tag';
            tag.textContent = t('presetsBy');
            title.appendChild(tag);
        }
        const meta = document.createElement('span');
        meta.className = 'profile-meta';
        meta.textContent = keys.filter(key => sectionLinks(key).length).map(sectionTitle).join(' · ');
        card.append(iconStrip(profileUrls(profile)), title, meta);
        if (profile.regional) {
            autoCard = card;
            autoProfile = profile;
        }
        card.addEventListener('click', () => {
            const on = !selectedProfiles.has(profile.id);
            if (on) {
                selectedProfiles.add(profile.id);
                profile.packs.forEach(p => selectedPacks.add(p));
            } else {
                selectedProfiles.delete(profile.id);
            }
            card.classList.toggle('selected', on);
            card.setAttribute('aria-pressed', on ? 'true' : 'false');
            if (profile.regional) regionRow.hidden = !on;
            syncPacks();
        });
        profileGrid.appendChild(card);
    });

    // Region switch: shown only while a region-dependent profile (the car set) is picked
    const regionRow = document.createElement('div');
    regionRow.className = 'region-row';
    regionRow.hidden = true;
    const regionLabel = document.createElement('span');
    regionLabel.className = 'setting-name';
    regionLabel.textContent = t('presetsRegion');
    const regionSwitch = document.createElement('div');
    regionSwitch.className = 'segmented';
    const regionButtons = {};
    [['ru', 'regionRu'], ['eu', 'regionEu']].forEach(([id, label]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = t(label);
        btn.addEventListener('click', () => {
            presetRegion = id;
            syncRegion();
            syncPacks();
        });
        regionButtons[id] = btn;
        regionSwitch.appendChild(btn);
    });
    const regionHint = document.createElement('small');
    regionHint.className = 'hint';
    regionHint.textContent = t('presetsRegionHint');
    regionRow.append(regionLabel, regionSwitch, regionHint);

    function syncRegion() {
        Object.entries(regionButtons).forEach(([id, btn]) => {
            btn.classList.toggle('active', id === presetRegion);
            btn.setAttribute('aria-pressed', id === presetRegion ? 'true' : 'false');
        });
        // The car card previews region-specific sites, so refresh its icons
        if (autoCard && autoProfile) {
            const old = autoCard.querySelector('.preset-icons');
            if (old) autoCard.replaceChild(iconStrip(profileUrls(autoProfile)), old);
        }
    }
    syncRegion();

    const packLabel = document.createElement('div');
    packLabel.className = 'section-label';
    packLabel.textContent = t('presetsPacks');
    const packRow = document.createElement('div');
    packRow.className = 'pack-row';
    const packButtons = {};
    SHARED_PACKS.forEach(key => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'pack-chip';
        chip.append(iconStrip(sectionLinks(key).map(l => l[1]).slice(0, 3)));
        const name = document.createElement('span');
        name.textContent = `${sectionTitle(key)} · ${sectionLinks(key).length}`;
        chip.appendChild(name);
        chip.addEventListener('click', () => {
            if (selectedPacks.has(key)) selectedPacks.delete(key); else selectedPacks.add(key);
            syncPacks();
        });
        packButtons[key] = chip;
        packRow.appendChild(chip);
    });

    const summary = document.createElement('p');
    summary.className = 'preset-summary';

    function syncPacks() {
        SHARED_PACKS.forEach(key => {
            const on = selectedPacks.has(key);
            packButtons[key].classList.toggle('selected', on);
            packButtons[key].setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        const keys = collectPresetSections([...selectedProfiles], [...selectedPacks]);
        summary.textContent = t('presetsSummary', { sections: String(keys.length), links: String(presetLinksFor(keys).length) });
    }

    // AI is useful to everyone and Apeex is the developer's own section; both start ticked, both can be unticked
    selectedPacks.add('ai');
    selectedPacks.add('apeex');
    syncPacks();

    content.append(profileLabel, profileGrid, regionRow, packLabel, packRow, summary);

    const submit = document.getElementById('import-submit-btn');
    submit.textContent = t(welcome ? 'presetsStart' : 'presetsApply');
    submit.style.display = 'inline-flex';
    submit.onclick = () => {
        const keys = collectPresetSections([...selectedProfiles], [...selectedPacks]);
        if (!keys.length) {
            alert(t('presetsNothing'));
            return;
        }
        const links = presetLinksFor(keys);
        const first = sectionTitle(keys[0]);
        const done = () => {
            storage.set({ onboarded: true });
            importModal.querySelector('.cancel-btn').textContent = t('cancel');
            importModal.style.display = 'none';
            refreshAll(first);
        };
        if (welcome) {
            let id = Date.now();
            saveLinks(links.map(link => ({ ...link, id: id++ })), () => {
                storage.set({ categoryOrder: keys.map(sectionTitle) }, done);
            });
        } else {
            addLinksToSections(links, (added, skipped) => {
                done();
                alert(t('importDone', { count: String(added), skipped: String(skipped) }));
            });
        }
    };

    // On first run the cancel button reads "Skip" and still marks onboarding as done
    const cancel = importModal.querySelector('.cancel-btn');
    cancel.textContent = t(welcome ? 'presetsSkip' : 'cancel');
    if (welcome) {
        const skip = () => {
            storage.set({ onboarded: true });
            cancel.textContent = t('cancel');
            importModal.removeEventListener('click', onBackdrop);
        };
        const onBackdrop = (e) => { if (e.target === importModal) skip(); };
        cancel.addEventListener('click', skip, { once: true });
        importModal.addEventListener('click', onBackdrop);
    }

    importModal.style.display = 'block';
}

let welcomeChecked = false;

// First run (called once the language is known, so names come out right): no saved links and never onboarded → offer the presets instead of the demo set
function maybeShowWelcome() {
    storage.get(['links', 'onboarded'], (result) => {
        if (welcomeChecked) return;
        welcomeChecked = true;
        if (result.onboarded || (Array.isArray(result.links) && result.links.length)) {
            if (!result.onboarded) storage.set({ onboarded: true });
            return;
        }
        showLinkPresets(true);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const settingsPresets = document.getElementById('settings-presets-btn');
    if (settingsPresets) {
        settingsPresets.addEventListener('click', () => {
            settingsModal.style.display = 'none';
            showLinkPresets(false);
        });
    }
});
