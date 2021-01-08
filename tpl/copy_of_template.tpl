<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>{title}</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1,
      user-scalable=no" name="viewport">
    <link rel="apple-touch-icon" sizes="57x57"
      href="/dist/img/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60"
      href="/dist/img/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72"
      href="/dist/img/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76"
      href="/dist/img/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114"
      href="/dist/img/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120"
      href="/dist/img/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144"
      href="/dist/img/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152"
      href="/dist/img/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180"
      href="/dist/img/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"
      href="/dist/img/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32"
      href="/dist/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96"
      href="/dist/img/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16"
      href="/dist/img/favicon-16x16.png">
    <link rel="shortcut icon" href="/dist/img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="../../dist/css/AdminLTE1.min.css">
    <link rel="stylesheet" href="../../dist/css/_all-skins1.min.css">
    <link rel="stylesheet" href="../../dist/plugins/pace/pace.min.css">
    {css}
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <!--[if lt IE 8]>
    <link href="dist/css/bootstrap-ie7.css" rel="stylesheet">
    <![endif]-->
  </head>
  <body class="hold-transition layout-top-nav skin-green fixed
    sidebar-collapse">
    <div class="wrapper">
      <header class="main-header">
      <nav class="navbar navbar-static-top">
        <div class="container">
          <div class="navbar-header">
            <a href="/starter" class="navbar-brand">{sitename}</a>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <i class="fa fa-bars"></i>
            </button>
          </div>
          <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
            <ul class="nav navbar-nav">
              {block_menu}
              <li><a href="/starter?logout">Выйти</a></li>
            </ul>
          </div>
          <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
              <li class="dropdown user user-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                  <img src="{photo_user}" class="user-image" alt="User Image">
                  <span class="hidden-xs">{fName} {lName}</span>
                </a>
                <ul class="dropdown-menu">
                  <li class="user-header">
                    <img src="{photo_user}" class="img-circle" alt="User Image">
                    <p>{fName} {lName}</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

      <div class="content-wrapper">
        <div class="container">
          <section class="content-header">
            <h1>{title}</h1>
          </section>
          {content}
        </div>
      </div>
      <footer class="main-footer">
        <a href="https://daniilak.ru/" target="_blank">Даниил</a>
        <strong>Copyright &copy; 2016-2018 </strong> All rights reserved.
        <script type="text/javascript">
        document.write("<a href='//www.liveinternet.ru/click' " +
          "target=_blank><img src='//counter.yadro.ru/hit?t26.1;r" +
          escape(document.referrer) + ((typeof (screen) == "undefined") ? "" :
            ";s" + screen.width + "*" + screen.height + "*" + (screen.colorDepth ?
              screen.colorDepth : screen.pixelDepth)) + ";u" + escape(document.URL) +
          ";" + Math.random() +
          "' alt='' title='LiveInternet: показано число посетителей за" +
          " сегодня' " +
          "border='0' width='88' height='15'><\/a>")
      </script>
      </footer>
    </div>
    <script src="https://code.jquery.com/jquery-3.2.0.min.js"
      integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I="crossorigin="anonymous"></script>
    <script
      src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../../dist/js/app.min.js"></script>
    <script src="../../dist/plugins/pace/pace.min.js"></script>
    <script
      src="https://adminlte.io/themes/AdminLTE/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="../../dist/js/pages/select.js"></script>
    {js}
  </body>
</html>