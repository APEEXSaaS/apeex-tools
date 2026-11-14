#!/usr/bin/env python3
"""Builds the bundled brand icon set: icons/brands/*.svg + brand-icons.js.

Sources (both CC0-1.0):
  gb:<file>  multicolor logos from https://github.com/gilbarbara/logos
  si:<slug>  Simple Icons (https://simpleicons.org), rendered as a brand-colored tile

Usage: python3 tools/build-brand-icons.py [path/to/simple-icons]
  The Simple Icons path defaults to ./node_modules/simple-icons (npm i simple-icons).
To add a service, add a line to BRANDS and re-run. Not shipped with the extension.
"""
import json
import os
import re
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'icons', 'brands')
OUT_JS = os.path.join(ROOT, 'brand-icons.js')
GB_BASE = 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/'

# key, source, hosts (exact host or any subdomain of it), optional host/path rules
BRANDS = [
    # Google
    ('google', 'gb:google-icon.svg', ['google.com', 'google.ru', 'google.de', 'google.co.uk', 'google.fr', 'google.es', 'google.it', 'google.pl', 'google.com.ua', 'google.by', 'google.kz', 'google.nl', 'google.ca', 'accounts.google.com', 'myaccount.google.com', 'admin.google.com'], []),
    ('gmail', 'gb:google-gmail.svg', ['mail.google.com', 'gmail.com'], []),
    ('google-drive', 'gb:google-drive.svg', ['drive.google.com'], []),
    ('google-meet', 'gb:google-meet.svg', ['meet.google.com'], []),
    ('google-calendar', 'gb:google-calendar.svg', ['calendar.google.com'], []),
    ('google-analytics', 'gb:google-analytics.svg', ['analytics.google.com'], ['marketingplatform.google.com/about/analytics']),
    ('google-keep', 'gb:google-keep.svg', ['keep.google.com'], []),
    ('google-photos', 'gb:google-photos.svg', ['photos.google.com'], []),
    ('google-maps', 'gb:google-maps.svg', ['maps.google.com', 'maps.app.goo.gl'], ['google.com/maps']),
    ('google-translate', 'si:googletranslate', ['translate.google.com', 'translate.google.ru'], []),
    ('google-docs', 'si:googledocs', [], ['docs.google.com/document']),
    ('google-sheets', 'si:googlesheets', ['sheets.google.com'], ['docs.google.com/spreadsheets']),
    ('google-slides', 'si:googleslides', ['slides.google.com'], ['docs.google.com/presentation']),
    ('google-forms', 'si:googleforms', ['forms.google.com'], ['docs.google.com/forms']),
    ('google-gemini', 'gb:google-gemini-icon.svg', ['gemini.google.com'], []),
    ('google-ai-studio', 'gb:google-aistudio.svg', ['aistudio.google.com'], []),
    ('notebooklm', 'si:notebooklm', ['notebooklm.google.com', 'notebooklm.google'], []),
    ('google-search-console', 'gb:google-search-console.svg', [], ['search.google.com/search-console']),
    ('google-tag-manager', 'gb:google-tag-manager.svg', ['tagmanager.google.com'], []),
    ('google-ads', 'gb:google-ads.svg', ['ads.google.com'], []),
    ('google-adsense', 'gb:google-adsense.svg', ['adsense.google.com'], []),
    ('google-cloud', 'gb:google-cloud.svg', ['cloud.google.com', 'console.cloud.google.com'], []),
    ('google-play', 'gb:google-play-icon.svg', ['play.google.com'], []),
    ('google-fonts', 'gb:google-fonts-icon.svg', ['fonts.google.com'], []),
    ('google-one', 'gb:google-one.svg', ['one.google.com'], []),
    ('looker-studio', 'gb:google-data-studio.svg', ['lookerstudio.google.com', 'datastudio.google.com'], []),
    ('youtube', 'gb:youtube-icon.svg', ['youtube.com', 'youtu.be', 'studio.youtube.com', 'music.youtube.com'], []),
    # Microsoft / Apple
    ('microsoft', 'gb:microsoft-icon.svg', ['microsoft.com', 'office.com', 'microsoft365.com', 'live.com'], []),
    ('onedrive', 'gb:microsoft-onedrive.svg', ['onedrive.live.com', 'onedrive.com'], []),
    ('teams', 'gb:microsoft-teams.svg', ['teams.microsoft.com', 'teams.live.com'], []),
    ('copilot', 'gb:microsoft-copilot-icon.svg', ['copilot.microsoft.com'], []),
    ('azure', 'gb:microsoft-azure.svg', ['azure.microsoft.com', 'portal.azure.com', 'azure.com'], []),
    ('bing', 'gb:bing.svg', ['bing.com'], []),
    ('apple', 'gb:apple.svg', ['apple.com'], []),
    ('icloud', 'si:icloud', ['icloud.com'], []),
    # AI
    ('chatgpt', 'gb:openai-icon.svg', ['chatgpt.com', 'chat.openai.com', 'openai.com', 'platform.openai.com', 'sora.com'], []),
    ('claude', 'gb:claude-icon.svg', ['claude.ai', 'claude.com'], []),
    ('anthropic', 'gb:anthropic-icon.svg', ['anthropic.com', 'console.anthropic.com', 'platform.claude.com'], []),
    ('perplexity', 'gb:perplexity-icon.svg', ['perplexity.ai'], []),
    ('grok', 'gb:grok-icon.svg', ['grok.com', 'x.ai'], []),
    ('deepseek', 'gb:deepseek-icon.svg', ['deepseek.com', 'chat.deepseek.com'], []),
    ('mistral', 'gb:mistral-ai-icon.svg', ['mistral.ai', 'chat.mistral.ai', 'console.mistral.ai'], []),
    ('meta-ai', 'gb:meta-icon.svg', ['meta.ai', 'meta.com'], []),
    ('midjourney', 'gb:midjourney.svg', ['midjourney.com'], []),
    ('elevenlabs', 'gb:elevenlabs-icon.svg', ['elevenlabs.io'], []),
    ('runway', 'gb:runway-icon.svg', ['runwayml.com', 'app.runwayml.com'], []),
    ('huggingface', 'gb:hugging-face-icon.svg', ['huggingface.co', 'hf.co'], []),
    ('cursor', 'gb:cursor-icon.svg', ['cursor.com', 'cursor.sh'], []),
    ('v0', 'gb:v0.svg', ['v0.dev', 'v0.app'], []),
    ('bolt', 'gb:bolt-icon.svg', ['bolt.new'], []),
    ('lovable', 'gb:lovable-icon.svg', ['lovable.dev'], []),
    ('replit', 'gb:replit-icon.svg', ['replit.com'], []),
    ('github-copilot', 'gb:github-copilot.svg', [], ['github.com/copilot']),
    # Dev & infra
    ('github', 'gb:github-icon.svg', ['github.com', 'gist.github.com'], []),
    ('gitlab', 'gb:gitlab-icon.svg', ['gitlab.com'], []),
    ('bitbucket', 'gb:bitbucket.svg', ['bitbucket.org'], []),
    ('vercel', 'gb:vercel-icon.svg', ['vercel.com'], []),
    ('netlify', 'gb:netlify-icon.svg', ['netlify.com', 'app.netlify.com'], []),
    ('railway', 'gb:railway.svg', ['railway.com', 'railway.app'], []),
    ('supabase', 'gb:supabase-icon.svg', ['supabase.com'], []),
    ('firebase', 'gb:firebase-icon.svg', ['firebase.google.com', 'console.firebase.google.com'], []),
    ('heroku', 'gb:heroku-icon.svg', ['heroku.com', 'dashboard.heroku.com'], []),
    ('render', 'si:render', ['render.com', 'dashboard.render.com'], []),
    ('fly', 'gb:fly-icon.svg', ['fly.io'], []),
    ('digitalocean', 'si:digitalocean', ['digitalocean.com', 'cloud.digitalocean.com'], []),
    ('aws', 'gb:aws.svg', ['aws.amazon.com', 'console.aws.amazon.com', 'signin.aws.amazon.com'], []),
    ('cloudflare', 'gb:cloudflare-icon.svg', ['cloudflare.com', 'dash.cloudflare.com'], []),
    ('docker', 'gb:docker-icon.svg', ['docker.com', 'hub.docker.com'], []),
    ('npm', 'gb:npm-icon.svg', ['npmjs.com'], []),
    ('stackoverflow', 'gb:stackoverflow-icon.svg', ['stackoverflow.com'], []),
    ('codepen', 'gb:codepen-icon.svg', ['codepen.io'], []),
    ('codesandbox', 'gb:codesandbox-icon.svg', ['codesandbox.io'], []),
    ('postman', 'gb:postman-icon.svg', ['postman.com', 'web.postman.co'], []),
    ('sentry', 'gb:sentry-icon.svg', ['sentry.io'], []),
    ('datadog', 'gb:datadog-icon.svg', ['datadoghq.com', 'datadoghq.eu'], []),
    ('grafana', 'gb:grafana.svg', ['grafana.com', 'grafana.net'], []),
    ('mongodb', 'gb:mongodb-icon.svg', ['mongodb.com', 'cloud.mongodb.com'], []),
    ('n8n', 'gb:n8n-icon.svg', ['n8n.io', 'n8n.cloud'], []),
    ('zapier', 'si:zapier', ['zapier.com'], []),
    ('make', 'si:make', ['make.com'], []),
    ('retool', 'gb:retool-icon.svg', ['retool.com'], []),
    ('strapi', 'gb:strapi-icon.svg', ['strapi.io'], []),
    ('webflow', 'si:webflow', ['webflow.com'], []),
    ('framer', 'gb:framer.svg', ['framer.com'], []),
    ('figma', 'gb:figma.svg', ['figma.com'], []),
    ('wix', 'si:wix', ['wix.com'], []),
    ('wordpress', 'gb:wordpress-icon.svg', ['wordpress.com', 'wordpress.org'], []),
    ('shopify', 'gb:shopify.svg', ['shopify.com', 'admin.shopify.com'], []),
    ('ghost', 'si:ghost', ['ghost.org'], []),
    ('gitbook', 'si:gitbook', ['gitbook.com', 'app.gitbook.com'], []),
    ('cpanel', 'si:cpanel', ['cpanel.net', 'cpanel.com'], []),
    ('namecheap', 'gb:namecheap.svg', ['namecheap.com'], []),
    ('spaceship', 'si:spaceship', ['spaceship.com'], []),
    ('godaddy', 'si:godaddy', ['godaddy.com'], []),
    ('hostinger', 'si:hostinger', ['hostinger.com'], []),
    # Work & productivity
    ('notion', 'gb:notion-icon.svg', ['notion.so', 'notion.com', 'notion.site'], []),
    ('slack', 'gb:slack-icon.svg', ['slack.com', 'app.slack.com'], []),
    ('discord', 'gb:discord-icon.svg', ['discord.com', 'discord.gg', 'discordapp.com'], []),
    ('telegram', 'gb:telegram.svg', ['telegram.org', 'web.telegram.org', 't.me'], []),
    ('whatsapp', 'gb:whatsapp-icon.svg', ['whatsapp.com', 'web.whatsapp.com', 'wa.me'], []),
    ('signal', 'gb:signal.svg', ['signal.org'], []),
    ('skype', 'gb:skype.svg', ['skype.com', 'web.skype.com'], []),
    ('zoom', 'gb:zoom-icon.svg', ['zoom.us', 'zoom.com'], []),
    ('miro', 'gb:miro-icon.svg', ['miro.com'], []),
    ('trello', 'gb:trello.svg', ['trello.com'], []),
    ('jira', 'gb:jira.svg', ['atlassian.net', 'jira.com', 'atlassian.com'], []),
    ('confluence', 'gb:confluence.svg', [], ['atlassian.net/wiki']),
    ('asana', 'gb:asana-icon.svg', ['asana.com', 'app.asana.com'], []),
    ('linear', 'gb:linear-icon.svg', ['linear.app'], []),
    ('clickup', 'gb:clickup-icon.svg', ['clickup.com', 'app.clickup.com'], []),
    ('monday', 'gb:monday-icon.svg', ['monday.com'], []),
    ('airtable', 'gb:airtable.svg', ['airtable.com'], []),
    ('todoist', 'gb:todoist-icon.svg', ['todoist.com', 'app.todoist.com'], []),
    ('loom', 'gb:loom-icon.svg', ['loom.com'], []),
    ('calendly', 'si:calendly', ['calendly.com'], []),
    ('dropbox', 'gb:dropbox.svg', ['dropbox.com'], []),
    ('obsidian', 'gb:obsidian-icon.svg', ['obsidian.md'], []),
    ('evernote', 'si:evernote', ['evernote.com'], []),
    ('hubspot', 'si:hubspot', ['hubspot.com', 'app.hubspot.com'], []),
    ('intercom', 'gb:intercom-icon.svg', ['intercom.com', 'app.intercom.com'], []),
    ('zendesk', 'gb:zendesk-icon.svg', ['zendesk.com'], []),
    ('mailchimp', 'gb:mailchimp-icon.svg', ['mailchimp.com'], []),
    ('brevo', 'si:brevo', ['brevo.com', 'app.brevo.com', 'sendinblue.com'], []),
    ('grammarly', 'gb:grammarly-icon.svg', ['grammarly.com', 'app.grammarly.com'], []),
    ('deepl', 'si:deepl', ['deepl.com'], []),
    ('proton', 'si:protonmail', ['proton.me', 'mail.proton.me', 'protonmail.com'], []),
    ('mega', 'si:mega', ['mega.nz', 'mega.io'], []),
    ('stripe', 'si:stripe', ['stripe.com', 'dashboard.stripe.com'], []),
    ('paypal', 'gb:paypal.svg', ['paypal.com'], []),
    # Social & media
    ('linkedin', 'gb:linkedin-icon.svg', ['linkedin.com'], []),
    ('x', 'gb:x.svg', ['x.com', 'twitter.com'], []),
    ('facebook', 'gb:facebook.svg', ['facebook.com', 'fb.com', 'messenger.com'], []),
    ('instagram', 'gb:instagram-icon.svg', ['instagram.com'], []),
    ('threads', 'gb:threads-icon.svg', ['threads.net', 'threads.com'], []),
    ('bluesky', 'gb:bluesky.svg', ['bsky.app'], []),
    ('mastodon', 'gb:mastodon-icon.svg', ['mastodon.social'], []),
    ('reddit', 'gb:reddit-icon.svg', ['reddit.com'], []),
    ('tiktok', 'gb:tiktok-icon.svg', ['tiktok.com'], []),
    ('pinterest', 'gb:pinterest.svg', ['pinterest.com', 'pinterest.ru'], []),
    ('quora', 'si:quora', ['quora.com'], []),
    ('tumblr', 'gb:tumblr-icon.svg', ['tumblr.com'], []),
    ('medium', 'gb:medium-icon.svg', ['medium.com'], []),
    ('vk', 'si:vk', ['vk.com', 'vk.ru'], []),
    ('habr', 'si:habr', ['habr.com'], []),
    ('twitch', 'gb:twitch.svg', ['twitch.tv'], []),
    ('vimeo', 'gb:vimeo-icon.svg', ['vimeo.com'], []),
    ('soundcloud', 'si:soundcloud', ['soundcloud.com'], []),
    ('spotify', 'gb:spotify-icon.svg', ['spotify.com', 'open.spotify.com'], []),
    ('netflix', 'gb:netflix-icon.svg', ['netflix.com'], []),
    ('patreon', 'gb:patreon.svg', ['patreon.com'], []),
    ('producthunt', 'gb:producthunt.svg', ['producthunt.com'], []),
    ('behance', 'si:behance', ['behance.net'], []),
    ('dribbble', 'gb:dribbble-icon.svg', ['dribbble.com'], []),
    ('wikipedia', 'si:wikipedia', ['wikipedia.org'], []),
    ('yandex', 'svg:yandex', ['yandex.ru', 'yandex.com', 'ya.ru', 'yandex.kz', 'yandex.by'], []),
    # Search engines (also used by the search engine presets)
    ('duckduckgo', 'gb:duckduckgo.svg', ['duckduckgo.com'], []),
    ('brave', 'gb:brave.svg', ['brave.com', 'search.brave.com'], []),
    ('ecosia', 'si:ecosia', ['ecosia.org'], []),
    ('qwant', 'si:qwant', ['qwant.com'], []),
    ('kagi', 'si:kagi', ['kagi.com'], []),
    ('startpage', 'si:startpage', ['startpage.com'], []),
    ('yahoo', 'gb:yahoo.svg', ['yahoo.com', 'search.yahoo.com'], []),
    ('baidu', 'si:baidu', ['baidu.com'], []),
    # Own products: the logo is kept in icons/source and read as a local file
    ('apeex', 'local:apeex.svg', ['apeex.io', 'apeex.com'], []),
    # Used by the link presets (professions and section packs)
    ('adobe', 'gb:adobe-icon.svg', ['adobe.com', 'express.adobe.com', 'firefly.adobe.com'], []),
    ('unsplash', 'si:unsplash', ['unsplash.com'], []),
    ('removebg', 'si:removedotbg', ['remove.bg'], []),
    ('mdn', 'si:mdnwebdocs', ['developer.mozilla.org'], []),
    ('semrush', 'si:semrush', ['semrush.com'], []),
    ('similarweb', 'si:similarweb', ['similarweb.com'], []),
    ('buffer', 'gb:buffer.svg', ['buffer.com'], []),
    ('hootsuite', 'si:hootsuite', ['hootsuite.com'], []),
    ('meta-business', 'gb:meta-icon.svg', ['business.facebook.com', 'adsmanager.facebook.com'], []),
    ('descript', 'gb:descript-icon.svg', ['descript.com'], []),
    ('duolingo', 'si:duolingo', ['duolingo.com'], []),
    ('khanacademy', 'gb:khan_academy-icon.svg', ['khanacademy.org'], []),
    ('quizlet', 'si:quizlet', ['quizlet.com'], []),
    ('google-classroom', 'si:googleclassroom', ['classroom.google.com'], []),
    ('google-scholar', 'si:googlescholar', ['scholar.google.com'], []),
    ('overleaf', 'si:overleaf', ['overleaf.com'], []),
    ('apple-tv', 'si:appletv', ['tv.apple.com'], []),
    ('apple-music', 'si:applemusic', ['music.apple.com'], []),
    ('hbo-max', 'si:hbomax', ['max.com', 'hbomax.com'], []),
    ('crunchyroll', 'si:crunchyroll', ['crunchyroll.com'], []),
    ('kinopoisk', 'si:kinopoisk', ['kinopoisk.ru', 'hd.kinopoisk.ru'], []),
    ('youtube-music', 'si:youtubemusic', ['music.youtube.com'], []),
    # Gaming
    ('epic-games', 'si:epicgames', ['epicgames.com', 'store.epicgames.com'], []),
    ('gog', 'si:gogdotcom', ['gog.com'], []),
    ('playstation', 'si:playstation', ['playstation.com', 'store.playstation.com'], []),
    ('battlenet', 'si:battledotnet', ['battle.net'], []),
    ('humble', 'si:humblebundle', ['humblebundle.com'], []),
    ('itchio', 'si:itchdotio', ['itch.io'], []),
    ('kick', 'si:kick', ['kick.com'], []),
    ('ea', 'si:ea', ['ea.com'], []),
    ('ubisoft', 'si:ubisoft', ['ubisoft.com', 'store.ubisoft.com'], []),
    ('riot', 'si:riotgames', ['riotgames.com', 'leagueoflegends.com'], []),
    ('faceit', 'si:faceit', ['faceit.com'], []),
    ('steamdb', 'si:steamdb', ['steamdb.info'], []),
    ('ign', 'si:ign', ['ign.com'], []),
    ('nvidia', 'gb:nvidia.svg', ['nvidia.com', 'play.geforcenow.com'], []),
    # Shopping, travel, finance, learning
    ('ebay', 'si:ebay', ['ebay.com', 'ebay.de', 'ebay.co.uk'], []),
    ('aliexpress', 'si:aliexpress', ['aliexpress.com', 'aliexpress.ru'], []),
    ('airbnb', 'gb:airbnb-icon.svg', ['airbnb.com', 'airbnb.ru'], []),
    ('steam', 'gb:steam.svg', ['steampowered.com', 'store.steampowered.com', 'steamcommunity.com'], []),
    ('binance', 'si:binance', ['binance.com'], []),
    ('coinbase', 'si:coinbase', ['coinbase.com'], []),
    ('tradingview', 'si:tradingview', ['tradingview.com'], []),
    ('upwork', 'si:upwork', ['upwork.com'], []),
    ('fiverr', 'si:fiverr', ['fiverr.com'], []),
    ('coursera', 'si:coursera', ['coursera.org'], []),
    ('udemy', 'gb:udemy-icon.svg', ['udemy.com'], []),
]

# Hand-made icons for brands missing from both sets
INLINE = {
    'yandex': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#FC3F1D" rx="20"/><path fill="#fff" d="M22.776 31.5h4.178v-24h-6.078c-6.112 0-9.324 3.142-9.324 7.77 0 3.695 1.762 5.87 4.904 8.115L11 31.5h4.524l6.077-9.082-2.106-1.416c-2.555-1.726-3.799-3.073-3.799-5.974 0-2.555 1.796-4.282 5.215-4.282h1.864V31.5Z"/></svg>',
}

# First hostname label → brand, for self-hosted instances (n8n.example.com, gitlab.company.io)
LABELS = {'n8n': 'n8n', 'gitlab': 'gitlab', 'grafana': 'grafana', 'sentry': 'sentry', 'jira': 'jira', 'confluence': 'confluence', 'strapi': 'strapi', 'supabase': 'supabase'}


# Display names for the link form's autofill; anything not listed is the key in Title Case
NAMES = {
    'google-ai-studio': 'Google AI Studio',
    'notebooklm': 'NotebookLM',
    'google-adsense': 'Google AdSense',
    'youtube': 'YouTube',
    'onedrive': 'OneDrive',
    'teams': 'Microsoft Teams',
    'icloud': 'iCloud',
    'chatgpt': 'ChatGPT',
    'deepseek': 'DeepSeek',
    'mistral': 'Mistral AI',
    'meta-ai': 'Meta AI',
    'elevenlabs': 'ElevenLabs',
    'huggingface': 'Hugging Face',
    'v0': 'v0',
    'github-copilot': 'GitHub Copilot',
    'github': 'GitHub',
    'gitlab': 'GitLab',
    'digitalocean': 'DigitalOcean',
    'aws': 'AWS',
    'npm': 'npm',
    'stackoverflow': 'Stack Overflow',
    'codepen': 'CodePen',
    'codesandbox': 'CodeSandbox',
    'mongodb': 'MongoDB',
    'n8n': 'n8n',
    'fly': 'Fly.io',
    'wordpress': 'WordPress',
    'gitbook': 'GitBook',
    'cpanel': 'cPanel',
    'godaddy': 'GoDaddy',
    'whatsapp': 'WhatsApp',
    'clickup': 'ClickUp',
    'monday': 'monday.com',
    'hubspot': 'HubSpot',
    'deepl': 'DeepL',
    'proton': 'Proton Mail',
    'mega': 'MEGA',
    'paypal': 'PayPal',
    'linkedin': 'LinkedIn',
    'x': 'X',
    'tiktok': 'TikTok',
    'vk': 'VK',
    'soundcloud': 'SoundCloud',
    'producthunt': 'Product Hunt',
    'duckduckgo': 'DuckDuckGo',
    'removebg': 'remove.bg',
    'apeex': 'Apeex',
    'mdn': 'MDN Web Docs',
    'meta-business': 'Meta Business Suite',
    'khanacademy': 'Khan Academy',
    'apple-tv': 'Apple TV',
    'hbo-max': 'HBO Max',
    'youtube-music': 'YouTube Music',
    'gog': 'GOG',
    'playstation': 'PlayStation',
    'battlenet': 'Battle.net',
    'humble': 'Humble Bundle',
    'itchio': 'itch.io',
    'ea': 'EA',
    'riot': 'Riot Games',
    'faceit': 'FACEIT',
    'steamdb': 'SteamDB',
    'ign': 'IGN',
    'nvidia': 'NVIDIA',
    'ebay': 'eBay',
    'aliexpress': 'AliExpress',
    'tradingview': 'TradingView',
    'kinopoisk': 'Кинопоиск',
    'yandex': 'Яндекс',
    'habr': 'Хабр',
    'gmail': 'Gmail',
    'looker-studio': 'Looker Studio',
    'epic-games': 'Epic Games',
    'google-play': 'Google Play',
    'docker': 'Docker Hub',
    'bing': 'Bing',
}


def display_name(key):
    return NAMES.get(key) or ' '.join(w.capitalize() for w in key.split('-'))


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'brand-icon-builder'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8')


def sanitize(svg):
    """Strip anything executable or external; icons are shown via <img>, but keep files clean."""
    svg = re.sub(r'<\?xml[^>]*\?>', '', svg)
    svg = re.sub(r'<!DOCTYPE[^>]*>', '', svg, flags=re.I)
    svg = re.sub(r'<!--.*?-->', '', svg, flags=re.S)
    svg = re.sub(r'<script.*?</script>', '', svg, flags=re.S | re.I)
    svg = re.sub(r'<title>.*?</title>', '', svg, flags=re.S)
    svg = re.sub(r'\son\w+="[^"]*"', '', svg)
    svg = re.sub(r'(?:xlink:)?href="(?!#)[^"]*"', '', svg)
    if 'javascript:' in svg.lower() or '<foreignobject' in svg.lower():
        raise ValueError('unsafe svg')
    return re.sub(r'>\s+<', '><', svg).strip()


def luminance(hex_color):
    r, g, b = (int(hex_color[i:i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def simple_icon_tile(si_dir, slug, meta):
    raw = open(os.path.join(si_dir, 'icons', slug + '.svg'), encoding='utf-8').read()
    path = re.search(r'<path d="([^"]+)"', raw).group(1)
    hex_color = meta[slug]
    glyph = '#1f1f1f' if luminance(hex_color) > 0.75 else '#ffffff'
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
            f'<rect width="64" height="64" rx="15" fill="#{hex_color}"/>'
            f'<g transform="translate(16 16) scale(1.3333)"><path fill="{glyph}" d="{path}"/></g></svg>')


def main():
    si_dir = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.getcwd(), 'node_modules', 'simple-icons')
    meta = {i['slug']: i['hex'] for i in json.load(open(os.path.join(si_dir, 'data', 'simple-icons.json'), encoding='utf-8')) if 'slug' in i}
    os.makedirs(OUT_DIR, exist_ok=True)
    hosts, paths, keys = {}, [], set()
    for key, source, host_list, path_list in BRANDS:
        kind, ref = source.split(':', 1)
        try:
            if kind == 'gb':
                svg = fetch(GB_BASE + ref)
            elif kind == 'svg':
                svg = INLINE[ref]
            elif kind == 'local':
                svg = open(os.path.join(ROOT, 'icons', 'source', ref), encoding='utf-8').read()
            else:
                svg = simple_icon_tile(si_dir, ref, meta)
        except Exception as e:  # missing upstream icon: skip, the page falls back to the favicon
            print('skip', key, e)
            continue
        with open(os.path.join(OUT_DIR, key + '.svg'), 'w', encoding='utf-8') as f:
            f.write(sanitize(svg))
        keys.add(key)
        for h in host_list:
            hosts[h] = key
        for p in path_list:
            host, _, prefix = p.partition('/')
            paths.append([host, '/' + prefix, key])
        print('ok', key)
    labels = {k: v for k, v in LABELS.items() if v in keys}
    js = ('// Generated by tools/build-brand-icons.py, do not edit by hand.\n'
          '// Icons: gilbarbara/logos and Simple Icons, both CC0-1.0.\n'
          f'const BRAND_ICON_HOSTS = {json.dumps(hosts, separators=(",", ":"), sort_keys=True)};\n'
          f'const BRAND_ICON_PATHS = {json.dumps(sorted(paths, key=lambda p: -len(p[1])), separators=(",", ":"))};\n'
          f'const BRAND_ICON_LABELS = {json.dumps(labels, separators=(",", ":"), sort_keys=True)};\n'
          f'const BRAND_NAMES = {json.dumps({k: display_name(k) for k in sorted(keys)}, ensure_ascii=False, separators=(",", ":"))};\n'
          + RESOLVER)
    open(OUT_JS, 'w', encoding='utf-8').write(js)
    print(len(keys), 'icons')


RESOLVER = r'''
// Returns the brand key for a URL (host/path rules, then parent domains, then a self-hosted label), or null.
function findBrandKey(url) {
    let parsed;
    try {
        parsed = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
    } catch (e) {
        return null;
    }
    const host = parsed.hostname.toLowerCase().replace(/^www\./, '');
    const path = parsed.pathname;
    const parts = host.split('.');
    for (const [ruleHost, prefix, key] of BRAND_ICON_PATHS) {
        if ((host === ruleHost || host.endsWith('.' + ruleHost)) && path.startsWith(prefix)) {
            return key;
        }
    }
    if (BRAND_ICON_HOSTS[host]) return BRAND_ICON_HOSTS[host];
    // A known tool on its own subdomain (n8n.example.com) beats the parent domain's brand
    if (parts.length > 2 && BRAND_ICON_LABELS[parts[0]]) {
        return BRAND_ICON_LABELS[parts[0]];
    }
    for (let i = 1; i < parts.length - 1; i++) {
        const key = BRAND_ICON_HOSTS[parts.slice(i).join('.')];
        if (key) return key;
    }
    return null;
}

// Bundled icon path for a URL, or null when the service is unknown
function findBrandIcon(url) {
    const key = findBrandKey(url);
    return key ? `icons/brands/${key}.svg` : null;
}

// Human name of a known service ("Google Drive"), or null
function findBrandName(url) {
    const key = findBrandKey(url);
    return key ? BRAND_NAMES[key] : null;
}
'''

if __name__ == '__main__':
    main()
