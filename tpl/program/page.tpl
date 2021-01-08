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
  <link rel="stylesheet" href="//ais.snochuvsu.ru/dist/css/adminlteOld.css">
  
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <style>
  	@media only screen and (max-width: 600px) {
	  .timeline>li>.timeline-item {
	   margin-left: 0;
       margin-right: 0;
	  }
	  .container-fluid.row {
	  	padding:0;
	  }
	}
  </style>
</head>
  
<body class="hold-transition skin-blue layout-top-nav" data-version="400" data-role="{role}">
  <div class="wrapper">
  	<nav class="navbar navbar-expand-sm navbar-dark navbar-gray-dark">
      <a class="navbar-brand" href="/">АИС СНО «Основа»</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExample03">
        <ul class="navbar-nav mr-auto" id="menu">
        </ul>
      </div>
    </nav>
    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid row">
        </div>
      </div>
      <div class="content">
        <div class="container-fluid row">
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
	<div class="modal fade" id="appendEvent" tabindex="-1" role="dialog" aria-labelledby="appendEventLabel" >
	    <div class="modal-dialog" role="document">
	        <div class="modal-content" >
	        	<form  class="formaddModal" data-toggle="validator" role="form" method="post" onSubmit="appendEvent(); return false;">
		            <div class="modal-header">
		                <h4 class="modal-title" id="appendEventLabel">Добавление мероприятия</h4>
		            </div>
		            <div class="modal-body">
					<div class="form-group">
						<label class="control-label">Конференция:</label>
						<select class="form-control boxed" name="add-event-conf-id" id="add-event-conf-id" required="">
						</select>
					</div>
					<div class="form-group">
						<label class="control-label">Тип:</label>
						<select class="form-control boxed" name="add-event-type" id="add-event-type" required="">
						</select>
					</div>
					<div class="form-group">
						<label class="control-label">Факультет:</label>
						<select class="form-control boxed" name="add-event-fac"  id="add-event-fac" required="">
						</select>
					</div>
					<div class="form-group">
						<label class="control-label">Дата и время проведения:</label>
						<input type="datetime-local" class="form-control boxed" name="add-event-date" id="add-event-date" required="">
					</div>
					<div class="form-group">
						<label class="control-label">Придумайте пароль для секции:</label>
						<input type="text" class="form-control boxed" name="add-event-pass" id="add-event-pass" required="">
					</div>
					<div class="form-group">
						<label class="control-label">Место проведения:</label>
						<input type="text" class="form-control boxed" name="add-event-location" id="add-event-location" required="">
						<p class="help-block">Например, Г-316</p>
					</div>
					
				
	                <div class="modal-footer">
	                    <button type="submit" class="btn btn-success"><i class="fa fa-paper-plane" id="spinner"></i>  Добавить</button>
	                    <button type="button" class="btn btn-default" data-dismiss="modal"> Отмена</button>
	                </div>
	            </div>
		        </form>
		    </div>
		</div>
	</div>
	<div class="modal fade" id="openSend" tabindex="-1" role="dialog" >
	    <div class="modal-dialog" role="document">
	        <div class="modal-content" >
	        	<form  class="formaddModal" data-toggle="validator" role="form" method="post" onSubmit="appendEvent(); return false;">
		            <div class="modal-header">
		                <h4 class="modal-title">Подача заявки</h4>
		            </div>
		            <div class="modal-body">
		            	<smal style="font-size:14px;">Отправляя данные, вы даёте своё согласие на обработку персональных данных.</smal>
		            	<hr>
						<div class="form-group">
							<label class="control-label">Название работы/команды:</label>
							<input type="text" class="form-control boxed" required="" name="add-event-name" id="add-event-name">
						</div>
						<div class="row">
							<div class="col-md-6">
								<smal style="font-size:15px;">Участники:</smal>
							</div>
							<div class="col-md-6 text-right">
								<button type="button" class="btn btn-warning"  onclick = 'document.querySelector(".user_block").appendChild(addMember())'> Добавить участника</button>
							</div>
						</div>
						<hr>
						<div class="user_block"></div>
						<hr>
						<div class="row ">
							<div class="col-md-6">
								<smal style="font-size:15px;">Руководители:</smal>
							</div>
							<div class="col-md-6 text-right">
								<button type="button" class="btn btn-warning" onclick = 'addLeader()'> Добавить руководителя</button>
							</div>
						</div>
						<hr>
						<div class="leader_block"></div>
	                <div class="modal-footer">
	                    <button type="button" onclick="sendZ();" class="btn btn-success"><i class="fa fa-paper-plane" id="spinner"></i> Отправить</button>
	                    <button type="button" class="btn btn-default" data-dismiss="modal"> Отмена</button>
	                </div>
	            </div>
		        </form>
		    </div>
		</div>
	</div>
<div id="" class="modal fade" role="dialog">
		<div class="modal-dialog">
	    	<div class="modal-content">
	    		<div class="modal-body">
	      			<div class="col-sm-12">
	      				<div class="form-group">
	      					<input type="text" class="form-control name_project" placeholder="Наименование работы">
	      				</div>
	      				<div class="form-group row">
							<div class="col-sm-3"><h4>Руководители:</h4></div>
							<div class="col-sm-3">
								
							</div>
						</div>
						<div class="form-group leader_block"></div>
							<div class="form-group row">
							<div class="col-sm-3"><h4>Участники:</h4></div>
							<div class="col-sm-3">
								
							</div>
						</div>
						<div class="user_block"></div>
	      			</div>
	    		</div>
	    		<div class="modal-footer">
	        		<button type="button" class="btn btn-default" data-dismiss="modal">Отмена</button>
	        		<input type="hidden" id="sendtoval" value="">
	        		<button type="button" class="btn btn-success" onclick="sendZ();">Подать заявку</button>
	    		</div>
	    	</div>
		</div>
	</div>
	    <script src="//ais.snochuvsu.ru/plugins/jquery/jquery.min.js"></script>
	<script src="//ais.snochuvsu.ru/dist/js/root.js?v=30"></script>
	<script src="//ais.snochuvsu.ru/dist/js/public.js?v=30"></script>
	<script src="//ais.snochuvsu.ru/dist/js/actions.js?v=30"></script>
    <script src="//ais.snochuvsu.ru/dist/js/loader.js?v=30"></script>
    <script src="https://www.cssscript.com/demo/multi-select-autocomplete-selectpure/bundle.min.js"></script>

  
      <script src="//ais.snochuvsu.ru/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="//ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
</body>

</html>