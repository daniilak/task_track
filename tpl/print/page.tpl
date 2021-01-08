
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Протокол</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <link rel="stylesheet" href="//ais.snochuvsu.ru/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="//ais.snochuvsu.ru/dist/css/adminlte.min.css">
  

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body onload="setTimeout(myFunction, 2000);">
<div class="wrapper">
  <!-- Main content -->
  <section class="invoice">
  	<div class="row text-center">
	    <div class="col-2">
	        <img src="https://sun9-48.userapi.com/c637725/v637725086/66217/duEJROxa26o.jpg" style="width: 170px;">
	    </div>
	    <div class="col-8">
	        <h2>{name_conf}</h2>
	        <h2>{name_fac}</h2>
	        <h4>{name_type} «{name}»</h4>
	        <h5>{location} {datetime}</h5>
	        <h2>ПРОТОКОЛ.</h2>
	    </div>
	    <div class="col-2">
	        <img src="https://sun9-65.userapi.com/c854420/v854420581/12e84b/grfifUQXro0.jpg" style="width: 175px;">
	    </div>
	</div>
    <!-- Table row -->
   <div class="row">
    <div class="col-xs-12 table-responsive">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>№</th>
                    <th style="width: 30%;">Название</th>
                    <th>Место</th>
                    <th>Участники</th>

                    <th>Руководители</th>
                </tr>
            </thead>
            <tbody>

                {table}

            </tbody>
        </table>
    </div>
    <!-- /.col -->
</div>
    <!-- /.row -->

    <div class="row">
      <!-- accepted payments column -->
      <div class="col-md-6">
        <p class="lead">Рекомендации:</p>
        {recStr}
        
      </div>
      <!-- /.col -->
      <div class="col-md-6">
        
      </div>
      <!-- /.col -->
    </div>
    <!-- /.row -->
    <div class="row">
	  {juri}
	</div>
  </section>
  <!-- /.content -->
</div>
<!-- ./wrapper -->
<script>
	function myFunction() {
    window.print();
}


</script>
</body>
</html>
