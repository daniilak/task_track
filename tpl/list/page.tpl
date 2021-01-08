<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>{title}</title>
  <link rel="stylesheet" href="//ais.snochuvsu.ru/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="//ais.snochuvsu.ru/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <link rel="stylesheet" href="//ais.snochuvsu.ru/dist/css/adminlte.min.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
  
<body class="hold-transition skin-blue layout-top-nav" data-version="12" data-role="{role}" onload="getMenu()">
  <div class="wrapper">
  	<nav class="navbar navbar-expand-sm navbar-dark navbar-gray-dark">
      <a class="navbar-brand" href="/">АИС СНО «Основа»</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav mr-auto" id="menu">
        	 
          <!--<li class="nav-item active">-->
          <!--  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>-->
          <!--</li>-->
        </ul>
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">{title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="container-fluid">
        	<div class="row">
        		<div class="col-md-12">	{content}</div>
        	</div>

        
        </div>
      </div>
    </div>

        <footer class="main-footer">
          <div class="float-right d-none d-sm-inline">
            Будущее за наукой!
          </div>
          <strong>Copyright &copy;  <a href="https://daniilak.ru">Даниил Агниашвили</a>.</strong> All rights
          reserved.
        </footer>
      </div>


	<script src="//ais.snochuvsu.ru/dist/js/root.js?v=12"></script>
   	<script src="//ais.snochuvsu.ru/dist/js/public.js?v=12"></script>

      <!--<script src="//ais.snochuvsu.ru/plugins/jquery/jquery.min.js"></script>-->
      <!--<script src="//ais.snochuvsu.ru/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>-->
      <!--<script src="//ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>-->
       <script
	    src="https://code.jquery.com/jquery-3.3.1.min.js"
	    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
	    crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="/docs/4.3/assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
    <script src="https://getbootstrap.com/docs/4.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o"
        crossorigin="anonymous"></script>


	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.18/b-1.5.6/b-html5-1.5.6/b-print-1.5.6/cr-1.5.0/datatables.min.js"></script>
	<script>
		$(document).ready(function() {
			var table = $('#example').DataTable( {
				language: {
					"paginate": {
						"next": ">",
						"previous": "<"
					},
					"search": "Поиск:",
					"lengthMenu": "Показать _MENU_ записей"
				},
				pageLength: 10,
				bInfo: false,
				// fnRowCallback: customFnRowCallback,
				searching: true,
				// columns: columnsi,
				// data: datei,
				aaSorting:[],
				//scrollY: 500,
				deferRender: true,
				//scroller: true,
				buttons: [ 'copy', 'excel', 'csv', 'print' ],
				"order": [[ 1, "desc" ]]
			});
			table.buttons().container().appendTo( '#example_wrapper .col-md-5:eq(0)' );
		});
	</script>
	
</body>

</html>