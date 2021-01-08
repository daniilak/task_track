<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Редактирование мероприятия</title>
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- daterange picker -->
  <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css">
  <link rel="stylesheet" href="plugins/vanilla-select-box/vanillaSelectBox.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="plugins/select2/css/select2.min.css">
  <link rel="stylesheet" href="plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>

<body class="layout-fixed text-sm sidebar-collapse">
  <div class="wrapper">

    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-dark navbar-gray-dark">
      <ul class="navbar-nav" id="menu">
      </ul>

      <!-- SEARCH FORM -->
      <form class="form-inline ml-3">
        <div class="input-group input-group-sm">
          <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-navbar" type="submit">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Messages Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-comments"></i>
            <span class="badge badge-danger navbar-badge">3</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Brad Diesel
                    <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">Call me whenever you can...</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    John Pierce
                    <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">I got your message bro</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <!-- Message Start -->
              <div class="media">
                <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                <div class="media-body">
                  <h3 class="dropdown-item-title">
                    Nora Silvester
                    <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                  </h3>
                  <p class="text-sm">The subject goes here</p>
                  <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                </div>
              </div>
              <!-- Message End -->
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
          </div>
        </li>
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-bell"></i>
            <span class="badge badge-warning navbar-badge">15</span>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <span class="dropdown-header">15 Notifications</span>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> 4 new messages
              <span class="float-right text-muted text-sm">3 mins</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-users mr-2"></i> 8 friend requests
              <span class="float-right text-muted text-sm">12 hours</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item">
              <i class="fas fa-file mr-2"></i> 3 new reports
              <span class="float-right text-muted text-sm">2 days</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
              class="fas fa-th-large"></i></a>
        </li>
      </ul>
    </nav>

    <div class="content-wrapper">
      <div class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="m-0 text-dark">Редактирование мероприятия</h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item"><a href="#">Главная</a></li>
                <li class="breadcrumb-item">Мероприятия</li>
                <li class="breadcrumb-item active">Редактирование мероприятия</li>
              </ol>
            </div><!-- /.col -->
          </div><!-- /.row -->
        </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->

      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3" id="container"> 


            </div>
            <!-- /.col -->
            <div class="col-md-9">
              <div class="card card-olive card-outline">
                <div class="card-header p-2">
                  <ul class="nav nav-pills">
                    <li class="nav-item"><a class="nav-link" href="#settings" data-toggle="tab">Настройки</a></li>
                    <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Работы (2) и
                        участники (3)</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#supervisors" data-toggle="tab">Руководители (2)</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#juri" data-toggle="tab">Жюри (3)</a></li>
                    <li class="nav-item"><a class="nav-link" href="#photo" data-toggle="tab">Фотоотчет</a></li>
                  </ul>
                </div><!-- /.card-header -->
                <div class="card-body">
                  <div class="tab-content">
                    <div class="tab-pane active" id="activity">
                      <!-- Начало -->
                      <a href="#" class="btn bg-olive"><i class="fas fa-plus"></i> Работу</a>
                      <hr>
                      <!-- Начало работы -->
                      <div class="card card-primary card-outline">
                        <div class="card-header">
                          <div class="card-title col-md-8">
                            <input type="text" class="form-control "
                              value="Разработка нейронной сети в качестве классификатора дефектов стали">
                          </div>
                          <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                              <i class="fas fa-minus"></i>
                            </button>
                            <div class="btn-group">
                              <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fas fa-wrench"></i>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right" role="menu" x-placement="bottom-end"
                                style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(46px, 19px, 0px);">
                                <a href="#" class="dropdown-item">Удалить работу</a>
                                <a href="#" class="dropdown-item">Допустить работу</a>
                                <a href="#" class="dropdown-item">Переместить работу</a>
                                <a href="#" class="dropdown-item">Добавить участника</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>

                          <div>
                            <div class="card-header">
                              <h3 class="card-title">
                                <dl>
                                  <dt>Иванов Иван Иванович, гр. ФЧ-12-12</dt>
                                  <dd>№: 213456, 2 курс, Бакалавриат, Бюджет</dd>
                                </dl>
                              </h3>
                              <div class="btn-group btn-group-sm float-right">
                                <div class="btn-group">
                                  <button type="button" class="btn bg-olive" data-edituser="1">
                                    <i class="fas fa-cog"></i> Изменить
                                  </button>
                                  <button type="button" class="btn bg-maroon" data-edituser="1">
                                    <i class="fas fa-trash"></i> Удалить
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="card-body row" style="display: none;" data-usereditdiv="1">
                              <div class="col-md-3">
                                <div class="form-group">
                                  <select class="form-control boxed" name="user_types_inst" id="user_types_inst"
                                    data-userselect="1">
                                    <option value="11">ЧувГУ</option>
                                    <option value="1">Другой вуз</option>
                                    <option value="2">Техникум</option>
                                    <option value="3">Колледж</option>
                                    <option value="4">ПТУ</option>
                                    <option value="5">Школа</option>
                                    <option value="6">Гимназия</option>
                                    <option value="7">Лицей</option>
                                    <option value="8">Компания</option>
                                    <option value="9">НИИ</option>
                                    <option value="10">Иное</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Фамилия">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName"
                                    placeholder="Номер зачетки">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <label><input type="radio" name="budjet_info" id="b_1" value="1"> Бюджет</label>
                                  <label><input type="radio" name="budjet_info" id="b_2" value="2" checked="checked">
                                    Контракт</label>
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Имя">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Отчество">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control name_organization"
                                    placeholder="Название учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization"
                                    placeholder="Город учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="1">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization" placeholder="Телефон">
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- конец участник -->
                          <div>
                            <div class="card-header">
                              <h3 class="card-title">
                                <dl>
                                  <dt>Иванова Ивонна Ивановна, гр. ФЧ-12-12</dt>
                                  <dd>№: 213456, 2 курс, Бакалавриат, Бюджет</dd>
                                </dl>
                              </h3>
                              <div class="btn-group btn-group-sm float-right">
                                <div class="btn-group">
                                  <button type="button" class="btn bg-olive" data-edituser="2">
                                    <i class="fas fa-cog"></i> Изменить
                                  </button>
                                  <button type="button" class="btn bg-maroon" data-edituser="1">
                                    <i class="fas fa-trash"></i> Удалить
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="card-body row" style="display: none;" data-usereditdiv="2">
                              <div class="col-md-3">
                                <div class="form-group">
                                  <select class="form-control boxed" name="user_types_inst" id="user_types_inst"
                                    data-userselect="2">
                                    <option value="11">ЧувГУ</option>
                                    <option value="1">Другой вуз</option>
                                    <option value="2">Техникум</option>
                                    <option value="3">Колледж</option>
                                    <option value="4">ПТУ</option>
                                    <option value="5">Школа</option>
                                    <option value="6">Гимназия</option>
                                    <option value="7">Лицей</option>
                                    <option value="8">Компания</option>
                                    <option value="9">НИИ</option>
                                    <option value="10">Иное</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Фамилия">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName"
                                    placeholder="Номер зачетки">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <label><input type="radio" name="budjet_info" id="b_1" value="1"> Бюджет</label>
                                  <label><input type="radio" name="budjet_info" id="b_2" value="2" checked="checked">
                                    Контракт</label>
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Имя">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Отчество">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control name_organization"
                                    placeholder="Название учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization"
                                    placeholder="Город учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="2">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization" placeholder="Телефон">
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- конец участник -->
                        </div>
                      </div>

                      <!-- Конец -->
                      <!-- Начало работы -->
                      <div class="card card-primary card-outline">
                        <div class="card-header">
                          <div class="card-title col-md-8">
                            <input type="text" class="form-control "
                              value="Анализ эффективности обучения на примере тараканов в общежитии">
                          </div>
                          <div class="card-tools">
                            <button type="button" class="btn btn-tool" data-card-widget="collapse">
                              <i class="fas fa-minus"></i>
                            </button>
                            <div class="btn-group">
                              <button type="button" class="btn btn-tool dropdown-toggle" data-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fas fa-wrench"></i>
                              </button>
                              <div class="dropdown-menu dropdown-menu-right" role="menu" x-placement="bottom-end"
                                style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(46px, 19px, 0px);">
                                <a href="#" class="dropdown-item">Удалить работу</a>
                                <a href="#" class="dropdown-item">Допустить работу</a>
                                <a href="#" class="dropdown-item">Переместить работу</a>
                                <a href="#" class="dropdown-item">Добавить участника</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>

                          <div>
                            <div class="card-header">
                              <h3 class="card-title">
                                <dl>
                                  <dt>Иванов Иван Иванович, гр. ФЧ-12-12</dt>
                                  <dd>№: 213456, 2 курс, Бакалавриат, Бюджет</dd>
                                </dl>
                              </h3>
                              <div class="btn-group btn-group-sm float-right">
                                <div class="btn-group">
                                  <button type="button" class="btn bg-olive" data-edituser="3">
                                    <i class="fas fa-cog"></i> Изменить
                                  </button>
                                  <button type="button" class="btn bg-maroon" data-edituser="3">
                                    <i class="fas fa-trash"></i> Удалить
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div class="card-body row" style="display: none;" data-usereditdiv="3">
                              <div class="col-md-3">
                                <div class="form-group">
                                  <select class="form-control boxed" name="user_types_inst" id="user_types_inst"
                                    data-userselect="3">
                                    <option value="11">ЧувГУ</option>
                                    <option value="1">Другой вуз</option>
                                    <option value="2">Техникум</option>
                                    <option value="3">Колледж</option>
                                    <option value="4">ПТУ</option>
                                    <option value="5">Школа</option>
                                    <option value="6">Гимназия</option>
                                    <option value="7">Лицей</option>
                                    <option value="8">Компания</option>
                                    <option value="9">НИИ</option>
                                    <option value="10">Иное</option>
                                  </select>
                                </div>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Фамилия">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName"
                                    placeholder="Номер зачетки">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="1" data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <label><input type="radio" name="budjet_info" id="b_1" value="1"> Бюджет</label>
                                  <label><input type="radio" name="budjet_info" id="b_2" value="2" checked="checked">
                                    Контракт</label>
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Имя">
                                </div>
                              </div>
                              <div class="col-md-3" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control lName" name="lName" placeholder="Отчество">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control name_organization"
                                    placeholder="Название учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization"
                                    placeholder="Город учреждения">
                                </div>
                              </div>
                              <div class="col-md-4" data-ischuvsu="0" style="display: none;"
                                data-usereditdivischuvsu="3">
                                <div class="form-group">
                                  <input type="text" class="form-control city_organization" placeholder="Телефон">
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- конец участник -->
                        </div>
                      </div>

                      <!-- Конец -->

                    </div>
                    <!-- /.tab-pane -->
                    <div class="tab-pane" id="supervisors">
                      <a href="#" class="btn bg-olive"><i class="fas fa-plus"></i> Научного руководителя</a>
                      <hr>
                      <div class="form-group row">
                        <div class="col-6">
                          <input type="text" class="form-control is-valid" id="inputSuccess"
                            placeholder="Фамилия Имя Отчество" value="Иванов Иван Иванович">
                        </div>
                        <div class="col-3">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10">Доцент</option>
                            <option value="6" selected="">Профессор</option>
                          </select>
                        </div>
                        <div class="col-2">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10" selected="">Не с ЧувГУ</option>
                            <option value="10">Кафедра</option>
                            <option value="6">Кафедра</option>
                          </select>
                        </div>
                        <div class="col-1">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-danger"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Курирует работы:</label>
                        <select multiple="" class="form-control" id="kur_1">
                        </select>
                      </div>
                      <hr>
                      <div class="form-group row">
                        <div class="col-6">
                          <input type="text" class="form-control is-valid" id="inputSuccess"
                            placeholder="Фамилия Имя Отчество" value="Иванов Иван Иванович">
                        </div>
                        <div class="col-3">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10">Доцент</option>
                            <option value="6" selected="">Профессор</option>
                          </select>
                        </div>
                        <div class="col-2">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10" selected="">Не с ЧувГУ</option>
                            <option value="10">Кафедра</option>
                            <option value="6">Кафедра</option>
                          </select>
                        </div>
                        <div class="col-1">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-danger"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label>Курирует работы:</label>
                        <select multiple="" class="form-control" id="kur_2">
                        </select>
                      </div>
                      <hr>
                    </div>

                    <div class="tab-pane" id="juri">
                      <a href="#" class="btn bg-olive"><i class="fas fa-plus"></i> Жюри</a>
                      <hr>
                      <div class="form-group row">
                        <div class="col-6">
                          <input type="text" class="form-control is-valid" id="inputSuccess"
                            placeholder="Фамилия Имя Отчество" value="Иванов Иван Иванович">
                        </div>
                        <div class="col-3">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10">Доцент</option>
                            <option value="6" selected="">Профессор</option>
                          </select>
                        </div>
                        <div class="col-2">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10" selected="">Не с ЧувГУ</option>
                            <option value="10">Кафедра</option>
                            <option value="6">Кафедра</option>
                          </select>
                        </div>
                        <div class="col-1">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-danger"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="form-group row">
                        <div class="col-6">
                          <input type="text" class="form-control is-valid" id="inputSuccess"
                            placeholder="Фамилия Имя Отчество" value="Иванов Иван Иванович">
                        </div>
                        <div class="col-3">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10">Доцент</option>
                            <option value="6" selected="">Профессор</option>
                          </select>
                        </div>
                        <div class="col-2">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10" selected="">Не с ЧувГУ</option>
                            <option value="10">Кафедра</option>
                            <option value="6">Кафедра</option>
                          </select>
                        </div>
                        <div class="col-1">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-danger"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="form-group row">
                        <div class="col-6">
                          <input type="text" class="form-control is-valid" id="inputSuccess"
                            placeholder="Фамилия Имя Отчество" value="Иванов Иван Иванович">
                        </div>
                        <div class="col-3">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10">Доцент</option>
                            <option value="6" selected="">Профессор</option>
                          </select>
                        </div>
                        <div class="col-2">
                          <select class="form-control leader_input" data-leader="id_position" data-id="16659">
                            <option value="10" selected="">Не с ЧувГУ</option>
                            <option value="10">Кафедра</option>
                            <option value="6">Кафедра</option>
                          </select>
                        </div>
                        <div class="col-1">
                          <div class="btn-group btn-group-sm">
                            <a href="#" class="btn btn-danger"><i class="fas fa-times"></i></a>
                          </div>
                        </div>
                      </div>
                      <hr>

                    </div>
                    <div class="tab-pane" id="settings">
                      <div class="form-group">
                        <label class="control-label">Название секции:</label>
                        <input type="text" class="form-control boxed name_section" data-autosave="name" data-id="1355"
                          value="Data Science как одна из новых проблем IT">
                      </div>
                      <div class="form-group">
                        <label class="control-label">Тип секции:</label>
                        <select class="form-control boxed id_type_section" data-autosave="id_type_section"
                          data-id="1355">
                          <option value="1" selected="">Секции</option>
                          <option value="2">Игры</option>
                          <option value="3">Олимпиады (командные)</option>
                          <option value="4">Встречи</option>
                          <option value="5">Квесты</option>
                          <option value="6">Выставки</option>
                          <option value="7">Экскурсии</option>
                          <option value="8">Конкурсы</option>
                          <option value="9">Олимпиады (одиночные)</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label>Могут принять участие:</label>
                        <select multiple="" class="form-control">
                          <option value="15">Бакалавриат 1 курс</option>
                          <option value="15">Бакалавриат 2 курс</option>
                          <option value="15">Бакалавриат 3 курс</option>
                          <option value="15">Бакалавриат 4 курс</option>
                          <option value="15">Специалитет 1 курс</option>
                          <option value="15">Специалитет 2 курс</option>
                          <option value="15">Специалитет 3 курс</option>
                          <option value="15">Специалитет 4 курс</option>
                          <option value="15">Специалитет 5 курс</option>
                          <option value="15">Специалитет 6 курс</option>
                          <option value="15">Школа 1 класс</option>
                          <option value="15">Школа 2 класс</option>
                          <option value="15">Школа 3 класс</option>
                          <option value="15">Школа 4 класс</option>
                          <option value="15">Школа 5 класс</option>
                          <option value="15">Школа 6 класс</option>
                          <option value="15">Школа 7 класс</option>
                          <option value="15">Школа 8 класс</option>
                          <option value="15">Школа 9 класс</option>
                          <option value="15">Школа 10 класс</option>
                          <option value="15">Школа 11 класс</option>
                          <option value="15">СПО 1 курс</option>
                          <option value="15">СПО 2 курс</option>
                          <option value="15">СПО 3 курс</option>
                          <option value="15">СПО 4 курс</option>
                          <option value="15">СПО 5 курс</option>
                          <option value="15">СПО 6 курс</option>
                        </select>
                        <p class="help-block">Выберите несколько</p>
                      </div>
                      <div class="form-group">
                        <label class="control-label">Факультет секции:</label>
                        <select class="form-control boxed" disabled="">
                          <option value="1">Не выбран</option>
                          <option value="2">ФИЯ</option>
                          <option value="3">ИВТ</option>
                          <option value="4">Факультет искусств</option>
                          <option value="5">ИГФ</option>
                          <option value="6">МСФ</option>
                          <option value="7">Медфак</option>
                          <option value="8">ФПМФиИТ</option>
                          <option value="9">РЭА</option>
                          <option value="10" selected="">ФРиЧФиЖ</option>
                          <option value="11">Стройфак</option>
                          <option value="12">ФУиСТ</option>
                          <option value="13">ХФФ</option>
                          <option value="14">Эконом</option>
                          <option value="15">ФЭиЭТ</option>
                          <option value="16">Юрфак</option>
                          <option value="17">Кафедра физкультуры</option>
                          <option value="18">Алатырь</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label class="control-label">Дата проведения:</label>
                        <input type="datetime-local" class="form-control boxed date_section" value="2019-11-12 11:30:00"
                          data-autosave="date" data-id="1355">
                      </div>
                      <div class="form-group">
                        <label class="control-label">Аудитория:</label>
                        <input type="text" class="form-control boxed location" value="I-408" data-autosave="location"
                          data-id="1355">
                        <p class="help-block">Буква корпуса, дефис, кабинет. Например, Г-316</p>
                      </div>
                      <div class="form-group" style="display:block">
                        <label class="control-label">Пароль секции:</label>
                        <input type="text" class="form-control boxed location" value="21212"
                          data-autosave="pass_section" data-id="1355">
                      </div>

                    </div>
                    <div class="tab-pane" id="photo">
                      <div class="form-group">
                        <label for="exampleInputFile">Загрузка фоток</label>
                        <div class="input-group">
                          <div class="custom-file">
                            <input type="file" class="custom-file-input" id="exampleInputFile">
                            <label class="custom-file-label" for="exampleInputFile">Выберите фотографии</label>
                          </div>
                          <div class="input-group-append">
                            <span class="input-group-text" id="">Загрузить</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- /.tab-content -->
                  </div><!-- /.card-body -->
                  <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
              </div>
            </div>
            <h3>Шаблон для поиска всех мероприятий:</h3>
            <div class="card card-solid">
              <div class="card-header row">
                <div class="col-md-3">
                  <h3 class="card-title">
                    <i class="fas fa-chart-pie mr-1"></i>
                    Мероприятия
                  </h3>
                </div>
                <div class="col-md-3">
                  <input type="text" class="form-control" id="inputSuccess" placeholder="Искать...">
                </div>
                <div class="col-md-3">
                  <select class="form-control">
                    <option>Секции</option>
                    <option>Олимпиады</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <select class="form-control">
                    <option>Все факультеты</option>
                    <option>ИВТ</option>
                    <option>ИГФ</option>
                    <option>ФИЯ</option>
                  </select>
                </div>


              </div>
              <div class="card-body pb-0">
                <div class="row d-flex align-items-stretch" id="myDiv">
                </div>
              </div>
              <div class="card-footer">
              </div>
            </div>
          </div>
        </div>

        <aside class="control-sidebar control-sidebar-dark">
          <div class="p-3">
            <h5>Title</h5>
            <p>Sidebar content</p>
          </div>
        </aside>

        <footer class="main-footer">
          <div class="float-right d-none d-sm-inline">
            Anything you want
          </div>
          <strong>Copyright &copy; 2016 <a href="https://daniilak.ru">Даниил Агниашвили</a>.</strong> All rights
          reserved.
        </footer>
      </div>


      <script src="dist/js/loader.js"></script>
      <script src="plugins/jquery/jquery.min.js"></script>
      <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>
      <script src="plugins/select2/js/select2.full.min.js"></script>
      <script src="plugins/daterangepicker/daterangepicker.js"></script>
      <script src="plugins/vanilla-select-box/vanillaSelectBox.js"></script>
      <script src="dist/js/demo2.js"></script>

</body>

</html>