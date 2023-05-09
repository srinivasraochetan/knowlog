(function (window) {
    window.__env = window.__env || {};

    window.__env.knowLogBaseAppAddress = 'https://localhost:5001';

    // category related apis
    window.__env.webApiServiceGetCategories = '/api/Categories';
    window.__env.webApiServiceAddCategory = '/api/Categories';
    window.__env.webApiServiceUpdateCategory = '/api/Categories/{id}';
    window.__env.webApiServiceDeleteCategory = '/api/Categories/{id}';
    window.__env.webApiServiceGetCategory = '/api/Categories/{id}';
    window.__env.webApiServiceSearchCategories =
        '/api/Categories/Search/{category}';

    // knowledge log related apis
    window.__env.webApiServiceGetKnowledgeLogs = '/api/KnowledgeLog';
    window.__env.webApiServiceAddKnowledgeLog = '/api/KnowledgeLog';
    window.__env.webApiServiceUpdateKnowledgeLog = '/api/KnowledgeLog/{id}';
    window.__env.webApiServiceDeleteKnowledgeLog = '/api/KnowledgeLog/{id}';
    window.__env.webApiServiceGetKnowledgeLog = '/api/KnowledgeLog/{id}';
    window.__env.webApiServiceGetLogsByCategory =
        '/api/KnowledgeLog/get-logs-by-category/{categoryId}';
    window.__env.webApiServiceSearchLogs = '/api/KnowledgeLog/{logTitle}';
    window.__env.webApiServiceSearchLogsWithCategory =
        '/api/KnowledgeLog/search-log-with-category/{searchedValue}';
})(this);
