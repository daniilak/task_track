<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>{title}</title>
  <link rel="stylesheet" href="//app.daniilak.ru/plugins/fontawesome-free/css/all.min.css">
  <link rel="stylesheet" href="//app.daniilak.ru/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <link rel="stylesheet" href="//app.daniilak.ru/plugins/select2/css/select2.min.css">
  <link rel="stylesheet" href="//app.daniilak.ru/dist/css/adminlte.min.css">
   
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

  <style>
	.my_select2_optgroup_selected {
    background-color: #ddd;
}
.my_select2_optgroup_hovered {
    color: #FFF;
    background-color: #5897fb !important;
    cursor: pointer;
}
strong.select2-results__group {
    padding: 0 !important;
}
.my_select2_optgroup {
    display: block;
    padding: 6px;
}
code {
        color: #000000;
 }
</style>
</head>

<body class="hold-transition skin-blue layout-top-nav" data-version="800" data-role="{role}">
  <div class="wrapper">
  	<nav class="navbar navbar-expand-sm navbar-dark navbar-gray-dark">
      <a class="navbar-brand" href="/">TrackOS</a>
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
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-9">
              <h1 class="m-0 text-dark text-title">{title}</h1>
            </div>
            <div class="col-sm-3">
            	<input type="hidden" id="dev-status" value="{id_status}">
            	<input type="hidden" id="dev-id-user" value="{id_user}">
            	<input type="hidden" id="dev-id-role" value="{id_role}">
            	<input type="hidden" id="dev-id-project" value="{id_project}">
              <ol class="text-right name_role">{name_role}{status}</ol>
            </div>

          </div>
          
        </div>
      </div>
      <div class="content">
        <div class="container-fluid">
        </div>
      </div>
    </div>

        <footer class="main-footer">
          <div class="float-right d-none d-sm-inline">
            Работаем за еду!
          </div>
          <strong>Copyright &copy; <a href="https://daniilak.ru">Perpetuum Mobile Squad</a>.</strong> All rights
          reserved.
        </footer>
      </div>
      
	<div class="modal fade" id="appendProject" tabindex="-1" role="dialog" aria-labelledby="appendProjectLabel" >
	    <div class="modal-dialog" role="document">
	        <div class="modal-content" >
	        	<form  class="formaddModal" data-toggle="validator" role="form" method="post" onSubmit="appendProject(); return false;">
		            <div class="modal-header">
		                <h4 class="modal-title" id="appendProjectLabel">Добавление проекта</h4>
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		            </div>
		            <div class="modal-body">
						<div class="form-group">
							<label class="control-label">Название проекта:</label>
							<input type="text" class="form-control boxed" required="" name="add-project-name" id="add-project-name">
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
	<div class="modal fade" id="appendProjectCode" tabindex="-1" role="dialog" aria-labelledby="appendProjectCodeLabel" >
	    <div class="modal-dialog" role="document">
	        <div class="modal-content" >
	        	<form  class="formaddModal" data-toggle="validator" role="form" method="post" onSubmit="appendProjectByCode(); return false;">
		            <div class="modal-header">
		                <h4 class="modal-title" id="appendProjectCodeLabel">Присоединиться к проекту</h4>
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		            </div>
		            <div class="modal-body">
						<div class="form-group">
							<label class="control-label">Введите код проекта:</label>
							<input type="text" class="form-control boxed" required="" name="code-project" id="code-project">
						</div>
	                <div class="modal-footer">
	                    <button type="submit" class="btn btn-success"><i class="fa fa-paper-plane" id="spinner"></i>  Присоединиться</button>
	                    <button type="button" class="btn btn-default" data-dismiss="modal"> Отмена</button>
	                </div>
	            </div>
		        </form>
		    </div>
		</div>
	</div>
	<div class="modal fade bd-example-modal-xl" id="editCard" tabindex="-1" role="dialog" aria-labelledby="editCardLabel" >
	    <div class="modal-dialog modal-xl" role="document">
	        <div class="modal-content" >
	        	<form  class="formaddModal" data-toggle="validator" role="form" method="post" onSubmit="editCard(); return false;">
		            <div class="modal-header">
		                <h4 class="modal-title" id="editCardLabel">Редактирование карточки</h4>
		                <input type="hidden" id="id-card">
		                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
		            </div>
		            <div class="modal-body">
		            	<div class="form-group row">
							<input type="text" class="form-control boxed" required=""  id="name-card" onchange='requestAction("edit_name_card", this)'>
						</div>
		            	<div class="row">
		            		<div class="col-md-9">
		            			<div class="form-group">
				                	<label>Описание:</label>
				                	<textarea class="form-control boxed" rows="4" placeholder="Описание ..." required=""  id="desc-card" onchange='requestAction("edit_desc_card", this)'></textarea>
				                </div>
		            			<div class="form-group">
				                	<label>Родительская задача:</label>
				            		<select class="form-control boxed" required=""  id="parent-card" onchange='requestAction("edit_parent_card", this)'></select>
				                </div>
				                <div class="form-group douter-cards-group">
				                	<label class="douter-cards">Подзадачи:</label>
				                	<ul class="list-group douter-cards-list">
									  <li class="list-group-item d-flex justify-content-between align-items-center">
									    #12 Безымянный
									    <span class="badge badge-primary badge-pill">В работе</span>
									  </li>
									  <li class="list-group-item d-flex justify-content-between align-items-center">
									    #12 Безымянный
									    <span class="badge badge-primary badge-pill">В работе</span>
									  </li>
									  <li class="list-group-item d-flex justify-content-between align-items-center">
									    #12 Безымянный
									    <span class="badge badge-primary badge-pill">В работе</span>
									  </li>
									</ul>
				                </div>
				                <div class="direct-chat-success">
				                	<div class="card-header text-muted"><h4>Действия:</h4></div>
									<div class="card-footer">
					                	<div class="input-group input-group-sm">
					                		<input type="text" class="form-control send-comment" placeholder="Комментарий...">
					                		<button type="button" class="btn btn-info btn-sm" onclick="sendComment()">Отправить</button>
					                	</div>
				                	</div>
				                <div class="card-body pt-0 comments-block" style="height: 350px; overflow-x: scroll;"><div class="chat"></div></div>
				                <!--<div class="card-footer">-->
				                	
				                <!--</div>-->
				                </div>
		            		</div>
		            		<div class="col-md-3">
		            			<div class="form-group row">
									<label class="control-label">Статус:</label>
									<select class="form-control boxed" required=""  id="column-card" onchange='requestAction("edit_col_card", this)'>
										<option value="appointed">TO DO</option>
										<option value="worked">В работе</option>
										<option value="tested">В тестировании</option>
										<option value="done">Выполнено</option>
									</select>
								</div>
		            			<div class="form-group row">
									<label class="control-label">Важность:</label>
									<select class="form-control boxed" required=""  id="priority-card" onchange='requestAction("edit_priority_card", this)'>
										<option value="0">Обычный</option>
										<option value="1">Важный</option>
										<option value="2">Срочный</option>
									</select>
								</div>
								
								<div class="form-group row row-redline">
									<label class="control-label redline-label">Редлайн:</label>
									<input type="datetime-local" class="form-control boxed" required=""  id="readline-card" onchange='requestAction("edit_readline_card", this)'>
								</div>
								<div class="form-group row row-dedline">
									<label class="control-label dedline-label">Дедлайн:</label>
									<input type="datetime-local" class="form-control boxed" required=""  id="deadline-card" onchange='requestAction("edit_deadline_card", this)'>
								</div>
								<div class="form-group row">
									<label class="control-label">Исполнитель:</label>
									<select class="form-control boxed" required=""  id="worker-card" onchange='requestAction("edit_worker_card", this)' ></select>
								</div>
		            		</div>
		            	</div>
						
	            </div>
		        </form>
		    </div>
		</div>
	</div>

	<script src="//app.daniilak.ru/plugins/jquery/jquery.min.js"></script>
	<script src="//app.daniilak.ru/dist/js/root.js?v=62"></script>
    <!--<script src="https://www.cssscript.com/demo/multi-select-autocomplete-selectpure/bundle.min.js"></script>-->
    <!--<script src="//app.daniilak.ru/plugins/select2/js/select2.min.js"></script>-->
	<script src="//app.daniilak.ru/dist/js/render.js?v=95"></script>
	<script src="//app.daniilak.ru/dist/js/actions.js?v=55"></script>
    <script src="//app.daniilak.ru/dist/js/loader.js?v=95"></script>
    <script src="//app.daniilak.ru/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
</body>
</html>