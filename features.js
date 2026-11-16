// Settings, themes, search engine presets, bookmark import and backups.
// Loaded after script.js and uses its globals (storage, t, getLinks, renderLinks...).

Object.assign(translations.ru, {
    appearance: 'Оформление',
    theme: 'Тема',
    themeAuto: 'Авто',
    themeLight: 'Светлая',
    themeDark: 'Тёмная',
    themeMidnight: 'Чёрная',
    themeSand: 'Песочная',
    accentColor: 'Акцентный цвет',
    density: 'Размер плиток',
    densityCompact: 'Компактные',
    densityComfortable: 'Обычные',
    densityLarge: 'Крупные',
    behavior: 'Поведение',
    openInNewTab: 'Открывать ссылки в новой вкладке',
    data: 'Данные',
    exportBackup: 'Скачать резервную копию',
    exportBackupHint: 'Ссылки, разделы, поисковики и настройки в одном .json файле',
    importFile: 'Загрузить из файла',
    importFileHint: 'Резервная копия (.json) или закладки любого браузера (.html)',
    importChromeBookmarks: 'Папки закладок Chrome',
    importChromeBookmarksHint: 'Каждая папка становится разделом, можно выбрать какие',
    importOpenTabs: 'Открытые вкладки',
    importOpenTabsHint: 'Добавить выбранные вкладки в раздел',
    close: 'Закрыть',
    done: 'Готово',
    presets: 'Популярные',
    presetsHint: 'Нажмите, чтобы добавить, или заполните поля вручную',
    added: 'добавлен',
    linkIcon: 'Иконка (необязательно)',
    linkIconPlaceholder: 'URL картинки или загрузите файл',
    uploadIcon: 'Загрузить',
    resetIcon: 'Сбросить',
    chooseFolders: 'Выберите папки',
    foldersFound: 'Найдено папок: {count}, закладок: {links}',
    newSection: 'Новый раздел «{name}»',
    intoSection: 'В раздел «{name}»',
    bookmarksCount: '{count} закл.',
    showLinks: 'Показать ссылки',
    importFolders: 'Импортировать',
    nothingSelected: 'Ничего не выбрано',
    importDone: 'Готово: добавлено {count} ссылок, пропущено дублей: {skipped}',
    restoreTitle: 'Восстановление из копии',
    restoreSummary: 'В файле: {links} ссылок, {categories} разделов.',
    restoreReplace: 'Заменить всё',
    restoreReplaceHint: 'Текущие ссылки, разделы и настройки будут заменены данными из файла',
    restoreMerge: 'Добавить к текущим',
    restoreMergeHint: 'Новые ссылки добавятся, дубли будут пропущены',
    invalidFile: 'Не удалось прочитать файл: это не резервная копия и не файл закладок',
    permissionDenied: 'Без разрешения браузера эта функция недоступна',
    extensionOnly: 'Эта функция работает только в установленном расширении',
    noBookmarks: 'Закладки не найдены',
    untitled: 'Без названия',
    rootFolder: 'Без папки'
});

Object.assign(translations.en, {
    appearance: 'Appearance',
    theme: 'Theme',
    themeAuto: 'Auto',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeMidnight: 'Black',
    themeSand: 'Sand',
    accentColor: 'Accent color',
    density: 'Tile size',
    densityCompact: 'Compact',
    densityComfortable: 'Regular',
    densityLarge: 'Large',
    behavior: 'Behavior',
    openInNewTab: 'Open links in a new tab',
    data: 'Data',
    exportBackup: 'Download backup',
    exportBackupHint: 'Links, sections, search engines and settings in one .json file',
    importFile: 'Load from file',
    importFileHint: 'A backup (.json) or bookmarks exported from any browser (.html)',
    importChromeBookmarks: 'Chrome bookmark folders',
    importChromeBookmarksHint: 'Each folder becomes a section; pick the ones you want',
    importOpenTabs: 'Open tabs',
    importOpenTabsHint: 'Add selected tabs to a section',
    close: 'Close',
    done: 'Done',
    presets: 'Popular',
    presetsHint: 'Click to add one, or fill in the fields yourself',
    added: 'added',
    linkIcon: 'Icon (optional)',
    linkIconPlaceholder: 'Image URL or upload a file',
    uploadIcon: 'Upload',
    resetIcon: 'Reset',
    chooseFolders: 'Choose folders',
    foldersFound: '{count} folders, {links} bookmarks',
    newSection: 'New section “{name}”',
    intoSection: 'Into “{name}”',
    bookmarksCount: '{count} links',
    showLinks: 'Show links',
    importFolders: 'Import',
    nothingSelected: 'Nothing selected',
    importDone: 'Done: {count} links added, {skipped} duplicates skipped',
    restoreTitle: 'Restore from backup',
    restoreSummary: 'The file has {links} links in {categories} sections.',
    restoreReplace: 'Replace everything',
    restoreReplaceHint: 'Current links, sections and settings are replaced with the file',
    restoreMerge: 'Add to current',
    restoreMergeHint: 'New links are added, duplicates are skipped',
    invalidFile: 'Could not read the file: it is neither a backup nor a bookmarks file',
    permissionDenied: 'This feature needs the browser permission',
    extensionOnly: 'This feature only works in the installed extension',
    noBookmarks: 'No bookmarks found',
    untitled: 'Untitled',
    rootFolder: 'No folder'
});

/* ---------- Settings & themes ---------- */

const DEFAULT_APP_SETTINGS = {
    theme: 'auto',          // auto | light | sand | dark | midnight
    accent: 'blue',
    density: 'comfortable', // compact | comfortable | large
    openInNewTab: false
};

const ACCENTS = {
    blue: '#1a73e8',
    violet: '#7c4dff',
    teal: '#0f9d8a',
    green: '#2e9e44',
    orange: '#e8710a',
    clay: '#c4613a',
    pink: '#d81b74',
    red: '#d93025',
    graphite: '#5f6b7a'
};

let appSettings = { ...DEFAULT_APP_SETTINGS };

function loadAppSettings(callback) {
    storage.get(['appSettings'], (result) => {
        appSettings = { ...DEFAULT_APP_SETTINGS, ...(result.appSettings || {}) };
        applyAppearance();
        if (callback) callback();
    });
}

function saveAppSettings(changes) {
    const linksNeedRender = 'openInNewTab' in changes;
    appSettings = { ...appSettings, ...changes };
    applyAppearance();
    storage.set({ appSettings });
    if (linksNeedRender) {
        getLinks((links) => renderLinks(links));
    }
}

function applyAppearance() {
    const root = document.documentElement;
    root.dataset.theme = appSettings.theme;
    root.dataset.density = appSettings.density;
    root.style.setProperty('--accent-color', ACCENTS[appSettings.accent] || ACCENTS.blue);
    // theme-boot.js reads this before first paint to avoid a light flash
    try {
        localStorage.setItem('appearanceBoot', JSON.stringify({
            theme: appSettings.theme,
            density: appSettings.density,
            accent: ACCENTS[appSettings.accent] || ACCENTS.blue
        }));
    } catch (e) {
        // Not critical
    }
    syncSettingsControls();
}

function syncSettingsControls() {
    document.querySelectorAll('[data-setting]').forEach(control => {
        const key = control.dataset.setting;
        if (control.type === 'checkbox') {
            control.checked = !!appSettings[key];
        } else if (control.dataset.value !== undefined) {
            const active = String(appSettings[key]) === control.dataset.value;
            control.classList.toggle('active', active);
            control.setAttribute('aria-pressed', active ? 'true' : 'false');
        }
    });
}

function buildAccentSwatches() {
    const container = document.getElementById('accent-swatches');
    if (!container || container.children.length) return;
    Object.entries(ACCENTS).forEach(([name, color]) => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'accent-swatch';
        swatch.style.setProperty('--swatch', color);
        swatch.dataset.setting = 'accent';
        swatch.dataset.value = name;
        swatch.title = name;
        swatch.setAttribute('aria-label', name);
        container.appendChild(swatch);
    });
}

function setupSettingsPanel() {
    buildAccentSwatches();
    const panel = document.getElementById('settings-modal');
    if (!panel) return;
    panel.addEventListener('click', (e) => {
        const control = e.target.closest('[data-setting][data-value]');
        if (!control) return;
        const changes = { [control.dataset.setting]: control.dataset.value };
        if (changes.theme === 'sand' && appSettings.accent === DEFAULT_APP_SETTINGS.accent) {
            changes.accent = 'clay';
        }
        saveAppSettings(changes);
    });
    panel.querySelectorAll('input[type="checkbox"][data-setting]').forEach(input => {
        input.addEventListener('change', () => saveAppSettings({ [input.dataset.setting]: input.checked }));
    });
    syncSettingsControls();
}

/* ---------- Permissions ---------- */

function isExtension() {
    return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
}

// Optional permissions are requested on first use (must run inside a click handler)
function ensurePermission(permission) {
    return new Promise((resolve) => {
        if (!isExtension() || !chrome.permissions) {
            alert(t('extensionOnly'));
            resolve(false);
            return;
        }
        chrome.permissions.contains({ permissions: [permission] }, (has) => {
            if (has) {
                resolve(true);
                return;
            }
            chrome.permissions.request({ permissions: [permission] }, (granted) => {
                if (!granted) alert(t('permissionDenied'));
                resolve(!!granted);
            });
        });
    });
}

/* ---------- Data helpers ---------- */

function normalizeUrl(url) {
    return String(url || '').trim().toLowerCase().replace(/\/+$/, '');
}

let nextLinkId = Date.now();
function newLinkId() {
    nextLinkId = Math.max(nextLinkId + 1, Date.now());
    return nextLinkId;
}

function refreshAll(categoryToShow) {
    getLinks((links) => {
        getCategories(links).then((categories) => {
            if (categoryToShow && categories.includes(categoryToShow)) {
                currentCategory = categoryToShow;
                storage.set({ lastCategory: currentCategory });
            } else if (!categories.includes(currentCategory) && categories.length) {
                currentCategory = categories[0];
            }
            renderCategories(categories);
            renderLinks(links);
        });
    });
}

// Merge new links into storage: skips duplicates within the target section, keeps section order
function addLinksToSections(newLinks, callback) {
    getLinks((existing) => {
        storage.get(['categoryOrder'], (result) => {
            const order = result.categoryOrder && result.categoryOrder.length
                ? result.categoryOrder.slice()
                : Array.from(new Set(existing.map(l => l.category))).sort(); // same fallback as getCategories
            const seen = new Set(existing.map(l => l.category + '\n' + normalizeUrl(l.url)));
            let added = 0;
            let skipped = 0;
            const merged = existing.slice();
            newLinks.forEach(link => {
                const key = link.category + '\n' + normalizeUrl(link.url);
                if (seen.has(key)) {
                    skipped++;
                    return;
                }
                seen.add(key);
                merged.push({ ...link, id: newLinkId() });
                if (!order.includes(link.category)) order.push(link.category);
                added++;
            });
            saveLinks(merged, () => {
                storage.set({ categoryOrder: order }, () => callback(added, skipped));
            });
        });
    });
}

function isImportableUrl(url) {
    return /^https?:\/\//i.test(url || '');
}

/* ---------- Import hub ---------- */

function showImportHub() {
    const content = document.getElementById('import-content');
    document.getElementById('import-modal-title').textContent = t('import');
    document.getElementById('import-submit-btn').style.display = 'none';
    importModal.querySelector('.cancel-btn').textContent = t('cancel');
    content.innerHTML = '';
    const options = [
        { title: t('presetsOpen'), hint: t('presetsOpenHint'), icon: 'grid', action: () => showLinkPresets(false) },
        { title: t('importChromeBookmarks'), hint: t('importChromeBookmarksHint'), icon: 'folder', action: importChromeBookmarkFolders },
        { title: t('importFile'), hint: t('importFileHint'), icon: 'file', action: () => importInput.click() },
        { title: t('importOpenTabs'), hint: t('importOpenTabsHint'), icon: 'tabs', action: importOpenTabs },
        { title: t('exportBackup'), hint: t('exportBackupHint'), icon: 'download', action: exportSettings }
    ];
    const list = document.createElement('div');
    list.className = 'option-list';
    options.forEach(option => list.appendChild(createOptionButton(option)));
    content.appendChild(list);
    importModal.style.display = 'block';
}

const OPTION_ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M12 18v-6M9 15l3-3 3 3"/>',
    tabs: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M8 5v4"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    replace: '<path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/>',
    merge: '<path d="M12 5v14M5 12h14"/>'
};

function createOptionButton({ title, hint, icon, action }) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${OPTION_ICONS[icon]}</svg></span><span class="option-text"><span class="option-title"></span><span class="option-hint"></span></span>`;
    btn.querySelector('.option-title').textContent = title;
    btn.querySelector('.option-hint').textContent = hint;
    btn.addEventListener('click', action);
    return btn;
}

async function importOpenTabs() {
    if (!(await ensurePermission('tabs'))) return;
    importModal.style.display = 'none';
    importAllTabsSelective();
}

/* ---------- Bookmark folders → sections ---------- */

async function importChromeBookmarkFolders() {
    if (!(await ensurePermission('bookmarks'))) return;
    chrome.bookmarks.getTree((tree) => {
        showFolderImport(collectFolders(tree, true));
    });
}

// Flatten a bookmarks tree into folders with their direct links; nested folders keep a path
function collectFolders(nodes, isChromeTree) {
    const folders = [];
    function walk(node, path) {
        const links = [];
        (node.children || []).forEach(child => {
            if (child.url) {
                if (isImportableUrl(child.url)) links.push({ name: child.title || hostnameOf(child.url), url: child.url });
            }
        });
        const name = node.title || t('rootFolder');
        if (links.length) folders.push({ name, path: path.concat(name).join(' / '), links });
        (node.children || []).forEach(child => {
            if (!child.url) walk(child, node.title ? path.concat(node.title) : path);
        });
    }
    nodes.forEach(root => {
        // Chrome's tree has an untitled root whose children are "Bookmarks bar", "Other bookmarks"...
        if (isChromeTree && !root.title) {
            (root.children || []).forEach(top => walk(top, []));
        } else {
            walk(root, []);
        }
    });
    return folders;
}

function hostnameOf(url) {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch (e) {
        return url;
    }
}

// Parse a Netscape bookmarks HTML file (Chrome, Firefox, Safari, Edge exports)
function parseBookmarksHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const rootList = doc.querySelector('dl');
    if (!rootList) return null;
    function readList(dl, title) {
        const node = { title, children: [] };
        Array.from(dl.children).forEach(dt => {
            if (dt.tagName !== 'DT') return;
            const anchor = dt.querySelector(':scope > a');
            const heading = dt.querySelector(':scope > h3');
            if (anchor) {
                node.children.push({ title: anchor.textContent.trim(), url: anchor.getAttribute('href') });
            } else if (heading) {
                const sub = dt.querySelector(':scope > dl') || (dt.nextElementSibling && dt.nextElementSibling.tagName === 'DL' ? dt.nextElementSibling : null);
                node.children.push(sub ? readList(sub, heading.textContent.trim()) : { title: heading.textContent.trim(), children: [] });
            }
        });
        return node;
    }
    return readList(rootList, '');
}

function showFolderImport(folders) {
    if (!folders.length) {
        alert(t('noBookmarks'));
        return;
    }
    getLinks((links) => {
        getCategories(links).then((categories) => {
            renderFolderImport(folders, categories);
        });
    });
}

function renderFolderImport(folders, categories) {
    const content = document.getElementById('import-content');
    const total = folders.reduce((sum, f) => sum + f.links.length, 0);
    document.getElementById('import-modal-title').textContent = t('chooseFolders');
    importModal.querySelector('.cancel-btn').textContent = t('cancel');
    content.innerHTML = '';

    const summary = document.createElement('p');
    summary.className = 'import-summary';
    summary.textContent = t('foldersFound', { count: folders.length, links: total });
    content.appendChild(summary);

    const controls = document.createElement('div');
    controls.className = 'select-controls';
    [['selectAll', true], ['deselectAll', false]].forEach(([label, value]) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'select-control-btn';
        btn.textContent = t(label);
        btn.addEventListener('click', () => {
            content.querySelectorAll('.folder-check').forEach(cb => {
                cb.checked = value;
                cb.dispatchEvent(new Event('change'));
            });
        });
        controls.appendChild(btn);
    });
    content.appendChild(controls);

    const list = document.createElement('div');
    list.className = 'folder-list';
    folders.forEach((folder, index) => {
        const card = document.createElement('div');
        card.className = 'folder-card';

        const head = document.createElement('div');
        head.className = 'folder-head';
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'folder-check';
        check.id = `folder-${index}`;
        const label = document.createElement('label');
        label.htmlFor = check.id;
        label.className = 'folder-name';
        label.innerHTML = '<span class="folder-title"></span><span class="folder-meta"></span>';
        label.querySelector('.folder-title').textContent = folder.name;
        label.querySelector('.folder-meta').textContent = `${folder.path} · ${t('bookmarksCount', { count: folder.links.length })}`;

        const target = document.createElement('select');
        target.className = 'folder-target';
        const newOption = document.createElement('option');
        newOption.value = '__new__';
        newOption.textContent = t('newSection', { name: folder.name });
        target.appendChild(newOption);
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = t('intoSection', { name: cat });
            if (cat.toLowerCase() === folder.name.toLowerCase()) option.selected = true;
            target.appendChild(option);
        });

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'folder-toggle';
        toggle.textContent = t('showLinks');

        head.append(check, label, target, toggle);
        card.appendChild(head);

        const items = document.createElement('div');
        items.className = 'folder-links';
        items.hidden = true;
        folder.links.forEach((link, linkIndex) => {
            const row = document.createElement('label');
            row.className = 'folder-link';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = true;
            cb.dataset.index = linkIndex;
            const img = document.createElement('span');
            img.className = 'folder-link-icon';
            loadFavicon(link.url, img);
            const text = document.createElement('span');
            text.className = 'folder-link-name';
            text.textContent = link.name;
            const host = document.createElement('span');
            host.className = 'folder-link-host';
            host.textContent = hostnameOf(link.url);
            row.append(cb, img, text, host);
            items.appendChild(row);
        });
        card.appendChild(items);

        toggle.addEventListener('click', () => {
            items.hidden = !items.hidden;
        });
        check.addEventListener('change', () => card.classList.toggle('selected', check.checked));
        list.appendChild(card);
    });
    content.appendChild(list);

    const submit = document.getElementById('import-submit-btn');
    submit.textContent = t('importFolders');
    submit.style.display = 'inline-flex';
    submit.onclick = () => {
        const newLinks = [];
        let firstCategory = null;
        list.querySelectorAll('.folder-card').forEach((card, index) => {
            if (!card.querySelector('.folder-check').checked) return;
            const folder = folders[index];
            const targetValue = card.querySelector('.folder-target').value;
            const category = targetValue === '__new__' ? uniqueSectionName(folder.name, categories, newLinks) : targetValue;
            firstCategory = firstCategory || category;
            card.querySelectorAll('.folder-links input[type="checkbox"]').forEach(cb => {
                if (!cb.checked) return;
                const link = folder.links[Number(cb.dataset.index)];
                newLinks.push({ name: link.name, url: link.url, category });
            });
        });
        if (!newLinks.length) {
            alert(t('nothingSelected'));
            return;
        }
        addLinksToSections(newLinks, (added, skipped) => {
            importModal.style.display = 'none';
            refreshAll(firstCategory);
            alert(t('importDone', { count: String(added), skipped: String(skipped) }));
        });
    };
    importModal.style.display = 'block';
}

// "Work" exists already → "Work 2", unless this import already created it
function uniqueSectionName(name, categories, pendingLinks) {
    const pending = new Set(pendingLinks.map(l => l.category));
    if (!categories.includes(name) || pending.has(name)) return name;
    let n = 2;
    while (categories.includes(`${name} ${n}`)) n++;
    return `${name} ${n}`;
}

/* ---------- Backup: export / import ---------- */

const BACKUP_KEYS = ['links', 'categoryOrder', 'customSearchEngines', 'hiddenSearchEngines', 'searchEngine', 'appSettings', 'language'];

function exportSettings() {
    storage.get(BACKUP_KEYS, (result) => {
        if (!result.links || !result.links.length) {
            alert(t('noDataExport'));
            return;
        }
        const backup = { app: 'apeex-tools', version: 2, exportedAt: new Date().toISOString() };
        BACKUP_KEYS.forEach(key => {
            if (result[key] !== undefined) backup[key] = result[key];
        });
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `apeex-tools-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
}

function handleImport(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        const text = String(event.target.result || '');
        const backup = parseBackup(text);
        if (backup) {
            showRestoreChoice(backup);
            return;
        }
        if (/<dl/i.test(text)) {
            const tree = parseBookmarksHtml(text);
            if (tree) {
                showFolderImport(collectFolders([tree], false));
                return;
            }
        }
        alert(t('invalidFile'));
    };
    reader.readAsText(file);
}

// Accepts v2 backups and the old format (a bare array of links)
function parseBackup(text) {
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        return null;
    }
    if (Array.isArray(data)) data = { links: data };
    if (!data || !Array.isArray(data.links)) return null;
    const links = data.links.filter(l => l && l.name && l.url && l.category);
    if (!links.length) return null;
    return { ...data, links };
}

function showRestoreChoice(backup) {
    const content = document.getElementById('import-content');
    const realLinks = backup.links.filter(l => l.name !== '_placeholder_');
    const categoryCount = new Set(backup.links.map(l => l.category)).size;
    document.getElementById('import-modal-title').textContent = t('restoreTitle');
    importModal.querySelector('.cancel-btn').textContent = t('cancel');
    document.getElementById('import-submit-btn').style.display = 'none';
    content.innerHTML = '';
    const summary = document.createElement('p');
    summary.className = 'import-summary';
    summary.textContent = t('restoreSummary', { links: String(realLinks.length), categories: String(categoryCount) });
    const list = document.createElement('div');
    list.className = 'option-list';
    list.appendChild(createOptionButton({
        title: t('restoreMerge'), hint: t('restoreMergeHint'), icon: 'merge',
        action: () => {
            addLinksToSections(backup.links.map(({ id, ...link }) => link), (added, skipped) => {
                mergeSearchEngines(backup.customSearchEngines, () => {
                    importModal.style.display = 'none';
                    refreshAll();
                    alert(t('importDone', { count: String(added), skipped: String(skipped) }));
                });
            });
        }
    }));
    list.appendChild(createOptionButton({
        title: t('restoreReplace'), hint: t('restoreReplaceHint'), icon: 'replace',
        action: () => {
            const data = {};
            BACKUP_KEYS.forEach(key => {
                if (backup[key] !== undefined) data[key] = backup[key];
            });
            storage.set(data, () => {
                importModal.style.display = 'none';
                loadAppSettings(() => {
                    if (backup.language && translations[backup.language]) {
                        currentLanguage = backup.language;
                        applyTranslations();
                    }
                    updateSearchEngineButtons();
                    refreshAll();
                    alert(t('settingsImported'));
                });
            });
        }
    }));
    content.append(summary, list);
    importModal.style.display = 'block';
}

function mergeSearchEngines(engines, callback) {
    if (!engines || typeof engines !== 'object') {
        callback();
        return;
    }
    storage.get(['customSearchEngines'], (result) => {
        const current = result.customSearchEngines || {};
        const urls = new Set(Object.values(current).map(e => normalizeUrl(e.url)));
        Object.entries(engines).forEach(([id, engine]) => {
            if (engine && engine.url && !urls.has(normalizeUrl(engine.url))) {
                current[current[id] ? `${id}_${Date.now()}` : id] = engine;
            }
        });
        storage.set({ customSearchEngines: current }, () => {
            updateSearchEngineButtons();
            callback();
        });
    });
}

/* ---------- Search engine presets ---------- */

const SEARCH_ENGINE_PRESETS = [
    { builtin: 'google', name: 'Google', url: 'https://www.google.com/search?q={query}' },
    { builtin: 'yandex', name: 'Yandex', url: 'https://yandex.ru/search/?text={query}' },
    { builtin: 'duckduckgo', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q={query}' },
    { builtin: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q={query}' },
    { name: 'Brave', url: 'https://search.brave.com/search?q={query}' },
    { name: 'Startpage', url: 'https://www.startpage.com/do/search?q={query}' },
    { name: 'Ecosia', url: 'https://www.ecosia.org/search?q={query}' },
    { name: 'Kagi', url: 'https://kagi.com/search?q={query}' },
    { name: 'Qwant', url: 'https://www.qwant.com/?q={query}' },
    { name: 'Yahoo', url: 'https://search.yahoo.com/search?p={query}' },
    { name: 'Baidu', url: 'https://www.baidu.com/s?wd={query}' },
    { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q={query}' },
    { name: 'ChatGPT', url: 'https://chatgpt.com/?q={query}' },
    { name: 'Claude', url: 'https://claude.ai/new?q={query}' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query={query}' },
    { name: 'Wikipedia', url: 'https://wikipedia.org/w/index.php?search={query}' },
    { name: 'GitHub', url: 'https://github.com/search?q={query}' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q={query}' },
    { name: 'Google Maps', url: 'https://www.google.com/maps/search/{query}' },
    { name: 'Google Translate', url: 'https://translate.google.com/?sl=auto&text={query}' },
    { name: 'Reddit', url: 'https://www.reddit.com/search/?q={query}' },
    { name: 'X', url: 'https://x.com/search?q={query}' }
];

function presetIcon(preset) {
    if (BUILTIN_ENGINE_ICONS[preset.builtin]) return BUILTIN_ENGINE_ICONS[preset.builtin];
    const src = typeof findBrandIcon === 'function' ? findBrandIcon(preset.url.replace('{query}', '')) : null;
    return src ? `<img src="${escapeHTML(src)}" alt="">` : `<span class="engine-letter">${escapeHTML(preset.name[0])}</span>`;
}

function renderSearchEnginePresets() {
    const container = document.getElementById('search-engine-presets');
    if (!container) return;
    getAllSearchEngines((engines) => {
        const activeUrls = new Set(Object.values(engines).map(e => normalizeUrl(e.url)));
        container.innerHTML = '';
        SEARCH_ENGINE_PRESETS.forEach(preset => {
            const isAdded = preset.builtin ? !!engines[preset.builtin] : activeUrls.has(normalizeUrl(preset.url));
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'preset-chip' + (isAdded ? ' is-added' : '');
            chip.disabled = isAdded || !!editingSearchEngineId;
            chip.innerHTML = `<span class="preset-icon">${presetIcon(preset)}</span><span class="preset-name"></span>`;
            chip.querySelector('.preset-name').textContent = preset.name;
            chip.title = isAdded ? `${preset.name} — ${t('added')}` : preset.name;
            chip.addEventListener('click', () => addPresetEngine(preset));
            container.appendChild(chip);
        });
    });
}

function addPresetEngine(preset) {
    if (preset.builtin) {
        storage.get(['hiddenSearchEngines'], (result) => {
            const hidden = (result.hiddenSearchEngines || []).filter(id => id !== preset.builtin);
            storage.set({ hiddenSearchEngines: hidden }, () => {
                updateSearchEngineButtons();
                renderSearchEnginePresets();
            });
        });
        return;
    }
    storage.get(['customSearchEngines'], (result) => {
        const engines = result.customSearchEngines || {};
        engines['custom_' + Date.now()] = { name: preset.name, url: preset.url, imageUrl: '', icon: '' };
        storage.set({ customSearchEngines: engines }, () => {
            updateSearchEngineButtons();
            renderSearchEnginePresets();
        });
    });
}

/* ---------- Custom link icon field ---------- */

function setLinkIconField(value) {
    const input = document.getElementById('link-icon');
    if (input) input.value = value && value.startsWith('data:') ? '' : (value || '');
    const preview = document.getElementById('link-icon-preview');
    if (preview) {
        preview.dataset.value = value || '';
        updateLinkIconPreview();
    }
}

function getLinkIconField() {
    const input = document.getElementById('link-icon');
    const preview = document.getElementById('link-icon-preview');
    const typed = input ? input.value.trim() : '';
    if (typed) return /^https?:\/\//i.test(typed) ? typed : '';
    return preview ? (preview.dataset.value || '') : '';
}

function updateLinkIconPreview() {
    const preview = document.getElementById('link-icon-preview');
    if (!preview) return;
    const url = document.getElementById('link-url').value.trim();
    const custom = getLinkIconField();
    if (url || custom) {
        loadFavicon(url || 'https://example.com', preview, custom);
    } else {
        preview.innerHTML = '';
    }
}

// Uploaded icons are downscaled to 128px PNG so they stay small in storage
function readIconFile(file, callback) {
    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            const size = 128;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const scale = Math.min(size / img.width, size / img.height);
            const w = img.width * scale;
            const h = img.height * scale;
            ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
            callback(canvas.toDataURL('image/png'));
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function setupLinkIconField() {
    const input = document.getElementById('link-icon');
    const upload = document.getElementById('link-icon-file');
    const uploadBtn = document.getElementById('link-icon-upload');
    const resetBtn = document.getElementById('link-icon-reset');
    const urlInput = document.getElementById('link-url');
    if (!input || !upload) return;
    let timer;
    const schedule = () => {
        clearTimeout(timer);
        timer = setTimeout(updateLinkIconPreview, 300);
    };
    input.addEventListener('input', () => {
        document.getElementById('link-icon-preview').dataset.value = '';
        schedule();
    });
    urlInput.addEventListener('input', schedule);
    uploadBtn.addEventListener('click', () => upload.click());
    upload.addEventListener('change', () => {
        const file = upload.files[0];
        upload.value = '';
        if (!file) return;
        readIconFile(file, (dataUrl) => {
            input.value = '';
            setLinkIconField(dataUrl);
        });
    });
    resetBtn.addEventListener('click', () => setLinkIconField(''));
}

/* ---------- Link name autofill ---------- */

// Second-level labels that are really part of a country suffix (example.co.uk, shop.com.ua)
const COMPOUND_SUFFIXES = new Set(['co', 'com', 'net', 'org', 'gov', 'edu', 'ac']);

// "my-cool-shop.co.uk/path" → "My Cool Shop"; known services get their real name instead
function suggestLinkName(url) {
    const brand = typeof findBrandName === 'function' ? findBrandName(url) : null;
    if (brand) return brand;
    let host;
    try {
        host = new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`).hostname.replace(/^www\./, '');
    } catch (e) {
        return '';
    }
    if (!host.includes('.')) return '';
    const parts = host.split('.');
    let index = parts.length - 2;
    if (index > 0 && parts[index].length <= 3 && COMPOUND_SUFFIXES.has(parts[index])) index--;
    const label = parts[index] || parts[0];
    return label.split(/[-_]+/).filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// The name follows the URL until the person types a name of their own
function setupLinkNameAutofill() {
    const urlInput = document.getElementById('link-url');
    const nameInput = document.getElementById('link-name');
    if (!urlInput || !nameInput) return;
    let timer;
    const fill = () => {
        if (nameInput.dataset.auto !== '1' && nameInput.value.trim()) return;
        const suggestion = suggestLinkName(urlInput.value.trim());
        nameInput.value = suggestion;
        nameInput.dataset.auto = '1';
    };
    urlInput.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(fill, 250);
    });
    urlInput.addEventListener('paste', () => setTimeout(fill, 0));
    nameInput.addEventListener('input', () => {
        nameInput.dataset.auto = nameInput.value.trim() ? '' : '1';
    });

    // Tabbing into an autofilled name selects it, so typing replaces it at once
    nameInput.addEventListener('focus', () => {
        if (nameInput.dataset.auto === '1' && nameInput.value) nameInput.select();
    });
}

/* ---------- Wiring ---------- */

document.addEventListener('DOMContentLoaded', () => {
    setupSettingsPanel();
    setupLinkIconField();
    setupLinkNameAutofill();
    const hubBtn = document.getElementById('import-tab-btn');
    if (hubBtn) hubBtn.addEventListener('click', showImportHub);
    const settingsExport = document.getElementById('settings-export-btn');
    if (settingsExport) settingsExport.addEventListener('click', exportSettings);
    const settingsImport = document.getElementById('settings-import-btn');
    if (settingsImport) {
        settingsImport.addEventListener('click', () => {
            settingsModal.style.display = 'none';
            showImportHub();
        });
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
            importModal.style.display = 'none';
            settingsModal.style.display = 'none';
        }
    });
});
