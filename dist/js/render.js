window.load = [!1, !1, !1, !1, !1, !1, !1, !1];

let container = $$(".content .container-fluid");

function renderMenu(menu) {
  let menuDiv = document.getElementById("menu");
  let locationPath = window.location.pathname.split("/")[1];
  menu.forEach(menuElem => {
    menuDiv.appendChild(
      cEl(
        "li",
        {
          class: `nav-item ${
            locationPath == menuElem.url.split("/")[1] ? "active" : ""
          }`
        },
        cEl(
          "a",
          [{ class: "nav-link" }, { href: menuElem.url }],
          [
            menuElem.icon.length > 0
              ? cEl("i", [
                  { class: `fa fa-${menuElem.icon}`, "aria-hidden": "true" }
                ])
              : menuElem.text,
            cSpan({ class: "sr-only" })
          ]
        )
      )
    );
  });
  let a = document.getElementById("navbarsExample03");
  a.appendChild(
    cEl(
      "ul",
      { class: "nav navbar-nav navbar-right" },
      cEl("li",{ class: `nav-item` },cEl("a", { class: "nav-link", href: "#", "data-toggle":"modal", "data-target":"#appendProject" }, "Создать проект"))
    )
  );
  a.appendChild(
    cEl(
      "ul",
      { class: "nav navbar-nav navbar-right" },
      cEl("li",{ class: `nav-item` },cEl("a", { class: "nav-link", href: "#", "data-toggle":"modal", "data-target":"#appendProjectCode"}, "Подключиться по коду"))
    )
  );
  a.appendChild(
    cEl(
      "ul",
      { class: "nav navbar-nav navbar-right" },
      cEl("li",{ class: `nav-item` },cEl("a", [{ class: "nav-link" }, { href: "/?logout" }], "Выйти"))
    )
  );
}


             
function renderAdvice() {
  let items = [
    "Не рекомендуется ставить кавычки в названиях",
    "Старайтесь придерживаться тактики планирования: один человек - одна задача - один день",
	"Чтобы команда оставалась управляемой и продуктивной в ней должно быть от 3 до 9 человек",
	"Этот сайт куда ламповее, чем Trello",
	"Придерживаться Style Guide - это важно",
	"Хорошая декомпозиция задач - половина успеха",
	"Внутренний DoD определяется руководителем команды разработки",
	"DoD должен пересматриваться хотя бы раз в год",
	"DoD может становиться только строже",
	"При планировании рассматривайте 3 сценария: успешный, реалистичный и пессимистичный",
	"Никогда не принимай решения за команду, не спросив её",
	"Родительская задача не может быть завершена, пока не будут завершены все дочерние",
	"Здоровый сон необходим для сохранения высокой продуктивности",
	"Не забывайте сбалансированно и вовремя принимать пищу",
	"Внешний DoD утверждается заказчиком, но на стадии согласования Вы всегда можете повлиять на него",
	"Рисками занимается project manager"
  ];

	return cDiv(null, [
		cDiv(
		{ class: "col-12" },
		cDiv({ class: "callout callout-info" }, [
		  cEl("h5", { class: "text" }, [
		    cEl("i", { class: "fa fa-info", "aria-hidden": "true" }, ""),
		    " Случайный совет:"
		  ]),
		  items[Math.floor(Math.random() * items.length)]
		])
		),
		cDiv(
			{class:"col-12"},
			cDiv({ class: "callout callout-info" }, [
			  cEl("h5", { class: "text" }, [
			    cEl("i", { class: "fa fa-th", "aria-hidden": "true" }, ""),
			    " Диаграмма Ганта:"
			  ]),
			  cEl("a", { class: "btn bg-success",  href:"http://app.daniilak.ru/gantt/"+$$("#dev-id-project").value, target:"_blank"}, "Открыть")
			])
		)
  ]);
}
function renderProjectTab(project) {
	let t = project.date_assigned.split(/[- :]/);

	$$(".projects-list" + ((project.is_removed == 0) ? "" : "-deleted")).appendChild(
		cDiv(
			{class:"col-12 col-sm-6 col-md-3"},
			cDiv(
				{class:"card bg-light"},
				[
					cDiv({class:"card-header row text-muted lead"}, project.name),
					cDiv({class:"card-body pt-0"}, [
						cEl("p", {class:"text-muted text-sm"}, [cEl("b",null, "Роль: "), getRole(project.id_role)]),
						cEl("p", {class:"text-muted text-sm"}, [cEl("b",null, "Дата подключения: "), ` ${t[2]}.${t[1]}.${t[0]} ${t[3]}:${t[4]}`])
					]),
				
					cDiv({class:"card-footer row"}, cEl("a", {href:"/projects/"+project.ID, class:"btn btn-block btn-info" }, "Перейти в проект"))
				]
			)
		)
	)

}

function getRole(role) {
	if (role == 0) {
		return "Создатель";
	}
	if (role == 1) {
		return "Участник"
	}
}

function renderColumns() {
	remove('.cards-grid');
	
	$$("#cards").append(cDiv({class:"row cards-grid"}, [
		
		cDiv({class:"col-md-3 cards-appointed"}, [
			cEl("h3", {class:"card-appointed-label"}, "TODO:"),
		]),
		cDiv({class:"col-md-3 cards-worked"}, [
			cEl("h3", {class:"card-worked-label"}, "В работе:"),
		]),
		cDiv({class:"col-md-3 cards-tested"}, [
			cEl("h3", {class:"card-tested-label"}, "В тестировании:"),
		]),
		cDiv({class:"col-md-3 cards-done"}, [
			cEl("h3", {class:"card-done-label"}, "Выполнено:"),
		]),
		
	]));
	
}

function getPriority(priority) {
	if (priority == 0) {
		return "Обычный";
	}
	if (priority == 1) {
		return "Важный";
	}
	if (priority == 2) {
		return "Срочный";
	}
	return "Обычный";
}
function renderCardBlock(card) {
	let t = card.date_created.split(/[- :]/);
	
	let d = card.date_deadline.split(/[- :]/);
	let deadline_1 = `${d[2]}.${d[1]}.${d[0]}`;
	let deadline_2 = `${d[3]}:${d[4]}`;
	if (card.date_deadline == '0000-00-00 00:00:00') {
		deadline_1 = "Не указано";
		deadline_2 = "";
	}
	
	
	let r = card.date_readline.split(/[- :]/);
	let readline_1 = `${r[2]}.${r[1]}.${r[0]}`;
	let readline_2 = `${r[3]}:${r[4]}`;
	if (card.date_readline == '0000-00-00 00:00:00') {
		readline_1 = "Не указано";
		readline_2 = "";
	}
	let id_status =parseInt($$("#dev-status").value);
	let folder = "";
		
	cardsGlobal.forEach(c => {
		if (card.ID == c.id_parent) {
			folder = cEl("i", {style:"padding-top:7px;",class:"fa fa-fw fa-folder-open"})
		}
	})
	let par = "";
		
	cardsGlobal.forEach(c => {
		if (card.id_parent == c.ID) {
			par = cEl("p", {class:"text-muted text-sm", style:"margin: 0;"}, [cEl("b",null, "Родительская: "), `#${c.ID} ${getName(c.name)}`])
		}
	})
	$$(".cards-"+card.status).appendChild(
		cDiv(
			// "data-toggle":"modal", "data-target":"#editCard"
			{class:"open-edit-card"},
			cDiv(
				{class:"card bg-light"},
				[
					cDiv({class:"card-header row text-muted lead card-header-open", style:"cursor:pointer;", "data-id":card.ID}, [`#${card.ID} ${getName(card.name)}`,((card.priority == 1) ? cEl("i",{style:"padding-top:7px;",class:"fa fa-fw fa-bolt"}) : (card.priority == 2) ? (cEl("i",{style:"padding-top:7px;",class:"fa fa-fw fa-fire"})): ""), folder]),
					cDiv({class:"card-body pt-1",  "data-id":card.ID, style:"display:none;"}, [
						cEl("p", {class:"text-muted text-sm", style:"margin: 0;"}, [cEl("b",null, "Создатель: "), card.author_name]),
						cEl("p", {class:"text-muted text-sm", style:"margin: 0;"}, [cEl("b",null, "Исполнитель: "), card.worker_name]),
						cEl("p", {class:"text-muted text-sm", style:"margin: 0;"}, [cEl("b",null, "Приоритет: "), getPriority(card.priority)]),
						par,
						cDiv({class:"row"}, [
							cDiv(
								{class:"col-md-" + ((id_status >= 4) ? "6" : "4")}, 
								cEl(
									"p",
									 {class:"text-muted text-sm"},
									 [cEl("b",null, "Создано: "), cEl("p",{style:"margin: 0;"}, `${t[2]}.${t[1]}.${t[0]}`), cEl("p",{style:"margin: 0;"}, `${t[3]}:${t[4]}`)]
								)
							),
							cDiv(
								{class:"col-md-"+((id_status >= 4) ? "6" : "4")}, 
								cEl(
									"p",
									 {class:"text-muted text-sm"},
									 [cEl("b",null,  (id_status >= 4) ? "Дедлайн: " : "Редлайн: "), cEl("p",{style:"margin: 0;"}, readline_1), cEl("p",{style:"margin: 0;"}, readline_2)]
								)
							),
							(id_status < 4)
							? cDiv(
									{class:"col-md-4"}, 
									cEl(
										"p",
										 {class:"text-muted text-sm"},
										 [cEl("b",null, "Дедлайн: "), cEl("p",{style:"margin: 0;"}, deadline_1), cEl("p",{style:"margin: 0;"}, deadline_2)]
									)
							)
							: cDiv()
							
						])
						
						
					]),
					cDiv({class:"row card-footer", "data-id":card.ID, style:"display:none;"}, cEl("button", {type:"button", "data-id":card.ID, class:"btn btn-block btn-info card-open" }, "Подробнее"))
				]
			)
		)
	)
}

$(document).on("click", ".card-header-open", function () {
	
    let cardID = $(this).data('id');
    if ($$(`.card-body .pt-1[data-id="${cardID}"]`).style.display == "none") {
    	$$(`.card-body .pt-1[data-id="${cardID}"]`).style.display = "";
    	$$(`.card-footer[data-id="${cardID}"]`).style.display = "";
    } else {
    	$$(`.card-body .pt-1[data-id="${cardID}"]`).style.display = 'none';
    	$$(`.card-footer[data-id="${cardID}"]`).style.display = "none";
    }
});
let monthes = ["","янв","фев","мар","апр","мая","июн","июл","авг","сен","окт","нояб","дек"] 
function renderDetaleCaption(action, last_val, now_val) {
	
	if (action == "name") {
		return cEl("p",null,[
			"Изменено название задачи с ",
			cEl("b", null, last_val),
			" на ",
			cEl("b", null, now_val),
		]);
	}
	if (action == "description") {
		return cEl("p",null,[
			"Изменено описание задача "
		]);
	}
	if (action == "priority") {
		return cEl("p",null,[
			"Изменен приоритет задачи с ",
			cEl("b", null, getPriority(last_val)),
			" на ",
			cEl("b", null, getPriority(now_val)),
		]);
	}
	if (action == "status") {
		return cEl("p",null,[
			"Изменен статус задачи с ",
			cEl("b", null, getStatusCard(last_val)),
			" на ",
			cEl("b", null, getStatusCard(now_val)),
		]);
	}
	if (action == "date_deadline" || action == "date_readline") {
		return cEl("p",null,[
			"Изменен дедлайн задачи "
		]);
	}
	if (action == "id_worker") {
		let userName1 = "Не выбрано";
		let userName2 = "";
		usersLoad.forEach(user => {
			if (user.us_id == last_val) {
				userName1 = user.name;
			}
			if (user.us_id == now_val) {
				userName2 = user.name;
			}
		});
		return cEl("p",null,[
			"Изменен исполнитель задачи с ",
			cEl("b", null, userName1),
			" на ",
			cEl("b", null, userName2),
		]);
	}
	if (action == "id_parent") {
		return cEl("p",null,[
			"Изменена родительская задача "
		]);
	}
	

	
	
	
}

function getStatusCard(status) {
	if (status == "appointed") 
	return "TO DO";
	if (status == "worked") 
	return "В работе";
	if (status == "tested") 
	return "В тестировании";
	if (status == "done") 
	return "Выполнено";
}
function renderDetale(det) {
	let userName = "";
	let userPhoto = "";
	usersLoad.forEach(user => {
		if (user.us_id == det.from_u_id) {
			userName = user.name;
			userPhoto = user.photo;
		}
	});
	let d = det.datetime.split(/[- :]/);
	
	$$(".chat").append(
		cDiv({class:"direct-chat-msg " + ((det.from_u_id == $$("#dev-id-user").value) ? "right" : "")},[
			cDiv({class:"direct-chat-info clearfix"}, [
				cEl("span", {class:"direct-chat-name pull-left"}, userName),
				cEl("span", {class:"direct-chat-timestamp pull-right"}, ` ${d[2]} ${monthes[parseInt(d[1])]} ${d[0]} ${d[3]}:${d[4]}`),
			]),
			cEl("img", {class:"direct-chat-img", src:userPhoto, alt:""}),
			cDiv({class:"direct-chat-text"}, (det.type_detale == "edit") ? renderDetaleCaption(det.type_edit, det.last_val, det.now_val) : det.msg)
		])
	);
}

function getName (text) {
	var sliced = text.slice(0,20);
	if (sliced.length < text.length) {
		sliced += '...';
	}
	return sliced;
}


$(document).on("click", ".card-open", function () {
	let id_status = parseInt($$("#dev-status").value);
    if (id_status == 0) {
    	alert("У вас ещё нет роли!")
    	return
    }
    let cardID = $(this).data('id');
	let sendingData = new FormData();
	sendingData.append('id', cardID);
	getJSON("/api/cards/getDetales", sendingData, detales => {
		remove(".chat")
		remove(".douter-cards")
		remove(".douter-cards-list")
		$$(".douter-cards-group").append(cEl("label",{class:"douter-cards"}, "Подзадач нет"));
		$$(".douter-cards-group").append(cEl("ul", {class:"list-group douter-cards-list"},));

		cardsGlobal.forEach(card => {
			if (cardID == card.id_parent) {
				$$(".douter-cards").innerText = "Подзадачи:"
				$$(".douter-cards-list").append(
				// cEl("ul", {class:"list-group douter-cards-list"},[
					cEl("li", {class:"list-group-item d-flex justify-content-between align-items-center"}, [`#${card.ID} ${getName(card.name)}`, cEl("span", {class:"badge badge-primary badge-pill"}, getStatusCard(card.status))])
				// ])
			);
			}
		})
		
		
		$$(".comments-block").append(cDiv({class:"chat"}))
		detales.forEach(detale => {
			console.log(detale)
			renderDetale(detale)
		});
		let selectElem = document.getElementById('parent-card');
		while (selectElem.childElementCount > 0) {
		    selectElem.removeChild(selectElem.querySelector('option'));
		}
	    $$("#parent-card").append(new Option("Нет", 0));
			
		let id_parent = 0
		
		$$("#parent-card").disabled = false;
		$$("#name-card").disabled = false;
		$$("#desc-card").disabled = false;
		$$("#deadline-card").disabled = false;
		$$("#readline-card").disabled = false;
		$$("#worker-card").disabled = false;
		$$("#priority-card").disabled = false;
		$$("#column-card").disabled = false;
		
	    for (card of cardsGlobal) {
	    	if (card.ID != cardID)
	    	console.log(card)
			$$("#parent-card").append(new Option("#"+card.ID + " " + getName(card.name), card.ID, false, false));
			
	    	if (card.ID == cardID) {
	    		$$("#id-card").value = cardID;
	    		if (card.id_parent != 0) {
	    			id_parent = card.id_parent
	    		}
	
	    		$$("#name-card").value = card.name;
	    		$$("#desc-card").value = card.description;
	    		$$("#deadline-card").value = card.date_deadline.replace(' ', 'T')+".000";
	    		$$("#readline-card").value = card.date_readline.replace(' ', 'T')+".000";
	    		$$("#worker-card").value = card.id_worker;
	    		$$("#priority-card").value = parseInt(card.priority);
	    		$$("#column-card").value = card.status;
	    		if (id_status == 4 || id_status == 5) {
	    			$$("#parent-card").setAttribute("disabled", "disabled");
	    			$$("#name-card").setAttribute("disabled", "disabled");
	    			$$("#desc-card").setAttribute("disabled", "disabled");
	    			$$("#deadline-card").setAttribute("disabled", "disabled");
	    			$$("#readline-card").setAttribute("disabled", "disabled");
	    			$$("#worker-card").setAttribute("disabled", "disabled");
	    			$$("#priority-card").setAttribute("disabled", "disabled");
	 
	    		}
	    		if (card.status == "done") {
	    			$$("#deadline-card").setAttribute("disabled", "disabled");
	    			$$("#readline-card").setAttribute("disabled", "disabled");
	    			$$("#worker-card").setAttribute("disabled", "disabled");
	    			$$("#priority-card").setAttribute("disabled", "disabled");
	 
	    		}
	    		if (id_status == "2") {
	    			if (card.status == 'done') {
						$$("#column-card").setAttribute("disabled", "disabled")
					}
	    			
	    		}
				if (id_status == "2" && card.id_worker != $$("#dev-id-user").value) {
					$$("#column-card").setAttribute("disabled", "disabled");
				}
				if (id_status == "4" ) {
					
					if (card.status == 'done' ||  card.status == 'tested') {
						$$("#column-card").setAttribute("disabled", "disabled")
					}
				}
				if (id_status == "5" ) {
					if (card.status == 'done') {
						$$("#column-card").setAttribute("disabled", "disabled")
					}
					if (card.id_worker != $$("#dev-id-user").value) {
						if (card.status == 'appointed' ||  card.status == 'worked') {
							$$("#column-card").setAttribute("disabled", "disabled")
						}
					}
				}
	    		
				
	    		
	    	}
	    }
	    $$("#parent-card").value = id_parent;
	
	    if (id_status >= 4) {
	    	$$(".row-dedline").style.display = "none";
	    	$$(".redline-label").innerText = "Дедлайн";
	    }
	   
	    $('#editCard').modal('show');
	});
    
    
    
      
});

function renderSettingsProject(project) {
	
	if ($$("#dev-id-role").value != 0) {
		remove('a[href="#settings"]')
	}
	
	$$("#settings").append(
	    cDiv({ class: "form-group" }, [
	      cEl("label", { class: "control-label" }, "Название проекта:"),
	      cEl("input", [
	        { type: "text" },
	        { class: "form-control boxed" },
	        { onchange: "updateProjectSettings('name', this)" },
	        { value: project.name }
	      ])
    	])
    );
    $$(".text-title").textContent = `Проект: «${project.name}» `;

    $$("#settings").append(cEl("label", { class: "control-label" }, "Код проекта:")),
    $$("#settings").append(
	    cDiv({ class: "form-group" }, [
	    	cDiv({ class: "input-group" }, [
	    		cEl("input", [
		        { type: "text" },
		        { disabled:"disabled"},
		        { class: "form-control code-project" },
		        { value: project.code }
		      ]),
		      cEl("span", {class:"input-group-btn"}, cEl("button", {type:"button", class:"btn btn-warning btn-flat", onclick: `requestAction('update_code_project', ${project.ID})`}, "Обновить код проекта"))
	    	])
	]));


  //  if (project.status == 0 || project.status >= 4) {
		// remove('.add_card');
  //  } else {
  //  	$$('.add_card').setAttribute("onclick",`requestAction("add_card", ${project.ID})`)
  //  }
	
	$$("#settings").append(
	    cDiv({ class: "form-group" }, [
	      cEl(
	          "a",
	          [
	            { class: "btn bg-danger" },
	            { onclick: `requestAction('remove_project', ${project.ID})` }
	          ],
	          "Удалить проект"
	        )
    	])
    );

}
function getStatus(status) {
	if (status == 0) {
		return "не выбрана роль";
	}
	if (status == 1) {
		return "менеджер проекта";
	}
	if (status == 2) {
		return "аналитик";
	}
	// if (status == 3) {
	// 	return "лидер команды разработчиков";
	// }
	if (status == 4) {
		return "разработчик";
	}
	if (status == 5) {
		return "тестировщик";
	}
}
function renderUserBlockInUserList(user) {
	// if (user.status != 5)
	$$("#worker-card").append(new Option(user.name, user.us_id));
	if (user.status == 5) {
		$$(`#worker-card option[value="${user.us_id}"]`).setAttribute("disabled", "disabled") 
	}
	let id_role = parseInt($$("#dev-id-role").value);
	$$(".user-list").append(
		cDiv({class:"row"}, [
			cDiv({class:"col-md-1"}, [
				cEl("img", {class:"img-circle", style:"width: 70px;", src:user.photo, alt:user.name}),
				
			]),
			cDiv({class:"col-md-6"}, [
				cEl("a", {class:"product-title", href:"javascript:void(0)"}, user.name),
				cEl("span", {class:"product-description"}, getRole(user.id_role) + ", " + getStatus(user.status))
			]),
			(id_role == 0)
			?
				cDiv({class:"col-md-3"}, [
					cEl("select", {class:"form-control boxed user-role", "onchange":`requestAction("edit_user", ${user.pr_id})`, "data-userid":user.us_id, "data-prid":user.pr_id})
				])
			: cDiv(),
			(id_role == 0)
			?
				cDiv({class:"col-md-1"}, [
					cEl("button", {type:"button", "data-id":user.ID, "onclick":`requestAction("remove_user", ${user.pr_id})`, class:"btn btn-block btn-danger", "data-userid":user.us_id, "data-prid":user.pr_id }, cEl("i", { class: "fa fa-trash", "aria-hidden": "true" }, ""),),
				])
			: cDiv(),
		])
	);
	$$(".user-list").append(cEl("hr"))
	if (id_role == 0 && user.us_id == parseInt($$("#dev-id-user").value)) {
		$$(`[data-userid="${user.us_id}"]`).setAttribute("disabled", "disabled")
	}
	if (id_role == 0) {
		$$(`[data-userid="${user.us_id}"]`).append(new Option("Не выбрано", 0, ((user.status == 0) ? true : false), ((user.status == 0) ? true : false)));
		$$(`[data-userid="${user.us_id}"]`).append(new Option("Менеджер проекта", 1, ((user.status == 1) ? true : false), ((user.status == 1) ? true : false)));
		$$(`[data-userid="${user.us_id}"]`).append(new Option("Аналитик", 2, ((user.status == 2) ? true : false), ((user.status == 2) ? true : false)));
		// $$(`[data-userid="${user.us_id}"]`).append(new Option("Лидер команды разработчиков", 3, ((user.status == 3) ? true : false), ((user.status == 3) ? true : false)));
		$$(`[data-userid="${user.us_id}"]`).append(new Option("Разработчик", 4, ((user.status == 4) ? true : false), ((user.status == 4) ? true : false)));
		$$(`[data-userid="${user.us_id}"]`).append(new Option("Тестировщик", 5, ((user.status == 5) ? true : false), ((user.status == 5) ? true : false)));
	}
}

