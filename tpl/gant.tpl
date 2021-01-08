
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>Tasks grouping</title>
	<script src="https://docs.dhtmlx.com/gantt/codebase/dhtmlxgantt.js?v=7.0.11"></script>
	<link rel="stylesheet" href="https://docs.dhtmlx.com/gantt/codebase/dhtmlxgantt.css?v=7.0.111">
	<link rel="stylesheet" href="https://docs.dhtmlx.com/gantt/samples/common/controls_styles.css?v=7.0.11">

	<style>
		html, body {
			height: 100%;
			padding: 0px;
			margin: 0px;
			overflow: hidden;
		}

		.summary-row,
		.summary-row.odd {
			background-color: #EEEEEE;
			font-weight: bold;
		}

		.gantt_grid div,
		.gantt_data_area div {
			font-size: 12px;
		}

		.summary-bar {
			opacity: 0.4;
		}

	</style>
</head>

<body>
<div class="gantt_control">
	<input type='button' id='default' onclick="showGroups()" value="В виде дерева">
	<input type='button' id='priority' onclick="showGroups('priority')" value="Группировка по приоритету">
	<input type='button' id='user' onclick="showGroups('user')" value="Группировка по исполнителю">
	<input type='button' id='stage' onclick="showGroups('stage')" value="Группировка по статусу">
</div>
<div id="gantt_here" style='width:100%; height:calc(100vh - 52px);'></div>
<script type="text/javascript">
	gantt.plugins({
		grouping: true,
		marker: true,
		quick_info: true
	});
	// test data
	var tasks = {
		data: [
			{data}
		], links: [
			{links}
		]
	};
	gantt.serverList("stage", [
		{
			key: 0, label: "В плане"},
		{
			key: 1, label: "В работе"},
		{
			key: 2, label: "В тесте"},
		{
			key: 3, label: "Выполнено"}
	]);
	gantt.serverList("user", [
		{user}
	]);
	gantt.serverList("priority", [
		{
			key: 0, label: "Обычный"},
		{
			key: 2, label: "Важный"},
		{
			key: 3, label: "Срочный"}
	]);

	// end text data
	var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
	var today = new Date();
	gantt.addMarker({
		start_date: today,
		css: "today",
		text: "Сегодня",
		title: "Сегодня: " + dateToStr(today)
	});

	var start = new Date({date_start});
	gantt.addMarker({
		start_date: start,
		css: "status_line",
		text: "Начало проекта",
		title: "Начало проекта: " + dateToStr(start)
	});
	gantt.config.scale_height = 50;

	
	
	gantt.config.order_branch = true;
	gantt.config.grid_width = 420;
	gantt.config.row_height = 24;
	gantt.config.grid_resize = true;

	gantt.i18n.setLocale({
		labels:{
			column_priority: 'Приоритет',
			section_priority: 'Приоритет',
			column_owner: 'Исполнитель',
			section_owner: 'Исполнитель',
			column_stage: 'Статус',
			section_stage: 'Статус',
			section_resources: 'Resources',
		}
	});

	function byId(list, id) {
		for (var i = 0; i < list.length; i++) {
			if (list[i].key == id)
				return list[i].label || "";
		}
		return "";
	}

	gantt.config.columns = [
		{ 
			name: "text", label: "Название задачи", tree: true, width: '*' },
		{ 
			name: "priority", width: 100, align: "center", template: function (item) {
			return byId(gantt.serverList('priority'), item.priority)
		}},
		{ 
			name: "owner", width: 100, align: "center", template: function (item) {
			return byId(gantt.serverList('user'), item.user)
		}},
		{
			name: "stage", width: 100, align: "center", template: function (item) {
			return byId(gantt.serverList('stage'), item.stage)
		}},
		// { 
		// 	name: "add", width: 100}
	];

	gantt.config.lightbox.sections = [
		{
			name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
		{
			name: "priority", height: 22, map_to: "priority", type: "select", options: gantt.serverList("priority")},
		{
			name: "owner", height: 22, map_to: "user", type: "select", options: gantt.serverList("user")},
		{
			name: "stage", height: 22, map_to: "stage", type: "select", options: gantt.serverList("stage")},
		{
			name: "time", type: "duration", map_to: "auto"}
	];

	gantt.templates.grid_row_class =
		gantt.templates.task_row_class = function (start, end, task) {
			if (task.$virtual)
				return "summary-row"
		};
	gantt.templates.task_class = function (start, end, task) {
		if (task.$virtual)
			return "summary-bar";
	};

	gantt.init("gantt_here");
	gantt.sort("start_date");
	gantt.parse(tasks);

	function showGroups(listname) {
		if (listname) {
			gantt.groupBy({
				groups: gantt.serverList(listname),
				relation_property: listname,
				group_id: "key",
				group_text: "label"
			});
			gantt.sort("start_date");
		} else {
			gantt.groupBy(false);

		}
	}


</script>


<script src="https://cdn.ravenjs.com/3.10.0/raven.min.js"></script>
<script>Raven.config('https://25a6d5e8c35148d195a1967d8374ffca@sentry.dhtmlx.ru/6').install()</script></body>