

function getMenu() {
  let ver = document.querySelector("[data-version]").getAttribute("data-version");
  if (localStorage.getItem("version")) {
    if (localStorage.getItem("version") != ver) {
      localStorage.clear();
    }
  }
  
  getJSON("/api/menu/getOpen", null, menu => {
    localStorage.setItem("version", ver);
    renderMenu(menu);
  });
}


function getProjects() {
	if (window.location.pathname.split("/")[1] != "starter") {
		window.location.replace("/starter");
	}
	remove(".projects-list");
	remove(".projects-list-deleted");
	remove(".project-list-deleted-label");
	
	remove(".callout-info");
	
	container.appendChild(cDiv({class:"row projects-list"}))
	container.appendChild(	cEl("h2", {class:"project-list-deleted-label"}, "Удаленные проекты:"))
	container.appendChild(cDiv({class:"row projects-list-deleted"}))
	
	getJSON("/api/projects/getAll", null, projects => {
		if (projects.length == 0) {
			window.load[0] = !0;
			container.appendChild(cCallout([cEl("h4", null, "Внимание!"),cEl("p", null, "У вас еще нет проектов, вы можете создать новый или подключиться по специальному коду")]))
			
		}
		projects.forEach(project => {
			renderProjectTab(project)
		})
		window.load[0] = !0;
	})
}
function getProjectData() {
	remove(".projects-data");
	container.appendChild(cDiv({class:"row projects-data"}, [
		cDiv({class:"col-md-9 order-2 order-md-1"}, cDiv({class:"card card-olive card-outline"}, [
			cDiv({class:"card-header p-2"}, cEl("ul",{class:"nav nav-pills nav-fill"}, [
				cEl("li", {class:"nav-item"}, cEl("a", {class:"nav-link", href:"#settings", "data-toggle":"tab"}, "Настройки")),
				cEl("li", {class:"nav-item"}, cEl("a", {class:"nav-link active", href:"#cards", "data-toggle":"tab"}, "Список задач")),
				cEl("li", {class:"nav-item"}, cEl("a", {class:"nav-link", href:"#users", "data-toggle":"tab"}, "Участники")),
				((parseInt($$("#dev-status").value) > 0 && parseInt($$("#dev-status").value) < 4)) 
				? cEl("a", { class: "btn bg-success add_card",  href:"#", onclick: `requestAction('add_card', ${$$('#dev-id-project').value})`}, "Добавить задачу")
				: cDiv()
			])),
			cDiv( {class:"card-body"}, cDiv({class:'tab-content'}, [
				cDiv({class:"tab-pane", id:"settings"}),
				cDiv({class:"tab-pane active", id:"cards"}),
				cDiv({class:"tab-pane", id:"users"})
			]))
		])),
		cDiv({class:"col-md-3 order-1 order-md-2 "}, renderAdvice())
	]));
	
	let sendingData = new FormData();
	sendingData.append('id', $$("#dev-id-project").value);
	getJSON("/api/projects/getByID", sendingData, project => {
		
		renderSettingsProject(project)
		window.load[2] = !0;
		loaderUsers()
	});
}

let usersLoad = [];
function loaderUsers() {
	let sendingData = new FormData();
	remove(".user-list")
	let selectElem = document.getElementById('worker-card');
	while (selectElem.childElementCount > 0) {
	    selectElem.removeChild(selectElem.querySelector('option'));
	}

	sendingData.append('id', $$("#dev-id-project").value);
	getJSON("/api/users/getAllProject", sendingData, users => {
		$$("#users").append(cEl( "ul", {class:"products-list product-list-in-box user-list"}));
		$$("#worker-card").append(new Option("Не выбран", 0));
		usersLoad = users;
		users.forEach(user => {
			renderUserBlockInUserList(user)
		});
		window.load[3] = !0;
		getCards()
	});

}

let cardsGlobal = [];
function getCards() {
	renderColumns();
	let sendingData = new FormData();
	sendingData.append('id', $$("#dev-id-project").value);
	getJSON("/api/cards/getAll", sendingData, cards => {
		// console.log(cards)
		cardsGlobal = cards;
		cards.forEach(card => {
			renderCardBlock(card)
		});
		if ($$(".cards-appointed").childElementCount == 0) {
			$$(".cards-appointed").appendChild(cCallout([cEl("p", null, "Пусто")]))
		}
		if ($$(".cards-worked").childElementCount == 0) {
			$$(".cards-worked").appendChild(cCallout([cEl("p", null, "Пусто")]))
		}
		if ($$(".cards-tested").childElementCount == 0) {
			$$(".cards-tested").appendChild(cCallout([cEl("p", null, "Пусто")]))
		}
		if ($$(".cards-done").childElementCount == 0) {
			$$(".cards-done").appendChild(cCallout([cEl("p", null, "Пусто")]))
		}
	
		window.load[4] = !0;
	});
}

function updateProjectSettings(type, el) {
	if (type == "name") {
		$$(".text-title").textContent = `Проект: «${el.value}» `;
		let sendingData = new FormData();
		sendingData.append('name', el.value);
		sendingData.append('id',$$("#dev-id-project").value);
		getJSON("/api/projects/update", sendingData, data => {
			console.log(data)
		});
	}
}
function requestAction(action, val) {
	let sendingData = new FormData();
	if (action == "remove_project") {
		if (!confirm("Вы действительно хотите удалить проект?")) {
	      return
	    }
		sendingData.append('id',val);
		getJSON("/api/projects/remove", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			if (data.code == 0) {
				alert("Успешно удалено!")
				window.location.replace("/starter");
				return;
			}
		});
	}
	if (action == "update_code_project") {
		if (!confirm("Вы действительно хотите обновить код проекта?")) {
	      return
	    }
	    sendingData.append('id',val);
		getJSON("/api/projects/updateCode", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			$$(".code-project").value = data.code;
		});
	}
	if (action == "add_card") {
		sendingData.append('id',val);
		getJSON("/api/cards/insert", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			alert("Задача создана!")
			getCards()
		});
	}
	if (action == "edit_user") {
		sendingData.append('id',val);
		sendingData.append('val', $$(`[data-prid="${val}"]`).value)
		sendingData.append('idProject', $$("#dev-id-project").value);
		getJSON("/api/users/editUser", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			// getCards()
			loaderUsers()
		});
		
	}
	if (action == "remove_user") {
		if (!confirm("Вы действительно хотите удалить человека из команды?")) {
	      return
	    }
		sendingData.append('id',val);
		sendingData.append('idProject',$$("#dev-id-project").value);
		getJSON("/api/users/removeUser", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			// getCards()
			loaderUsers()
		});
		
	}
	
	if (action == "edit_name_card" ||
		action == "edit_desc_card" ||
		action == "edit_col_card" ||
		action == "edit_priority_card" ||
		action == "edit_deadline_card" ||
		action == "edit_readline_card" ||
		action == "edit_parent_card" ||
		action == "edit_worker_card") {
		if (action == "edit_name_card") {
			if (val.value.length == 0) {
				alert("Название задачи не может быть пустым")
				$$("#name-card").value = "Безымянный"
				val.value = "Безымянный"
			}
		}
		if (action == "edit_deadline_card" || action == "edit_readline_card") {
			// alert("Дата должна быть!")
			if ($$("#readline-card").valueAsNumber && $$("#deadline-card").valueAsNumber) {

				if (action == "edit_deadline_card") {
					if (val.valueAsNumber < $$("#readline-card").valueAsNumber) {
						$$("#deadline-card").value = null;
						alert("Дедлайн не может быть раньше редлайна!")
						return;
					}
				}
				if (action == "edit_readline_card") {
					if (val.valueAsNumber > $$("#deadline-card").valueAsNumber) {
						$$("#readline-card").value = null;
						alert("Редлайн не может быть позже редлайна!")
						return;
					}
				}
			}
			// return
		}
		sendingData.append('value',val.value);
		sendingData.append('id_card',$$("#id-card").value);
		sendingData.append('action',action);
		getJSON("/api/cards/updateCard", sendingData, data => {
			if (data.code == 1) {
				alert("Возникла ошибка!")
				return;
			}
			if (data.code == 2) {
				$$("#column-card").value = data.old;
				alert("Нельзя переместить пока дочерние не будут перемещены!")
				return;
			}
			if (data.code == 3) {
				
				alert("Необходимо сначала написать комментарий!")
				$$("#column-card").value = "tested";
				return;
			}
			if (data.code == 4) {
				
				alert("Необходимо сначала заполнить важные поля!")
				$$("#column-card").value = "appointed";
				return;
			}
			if (action == "edit_col_card" && val.value == "tested" && $$("#dev-status").value == 4) {
				$$("#column-card").setAttribute("disabled", "disabled")
			}
			if (action == "edit_col_card" && val.value == "worked" && $$("#dev-status").value == 5) {
				$$("#column-card").setAttribute("disabled", "disabled")
			}
			if (action == "edit_col_card" && val.value == "done" && $$("#dev-status").value == 5) {
				$$("#column-card").setAttribute("disabled", "disabled")
			}

			let sendingData1 = new FormData();
			sendingData1.append('id', $$("#id-card").value);
			getJSON("/api/cards/getDetales", sendingData1, detales => {
				remove(".chat")
				$$(".comments-block").append(cDiv({class:"chat"}))
				detales.forEach(detale => {
						renderDetale(detale)
					});
			});
			
			getCards()
		});
	}
	
}

function sendComment() {
	let sendingData = new FormData();
	let comment = $$(".send-comment").value;
	let cardID = $$("#id-card").value;
	
	sendingData.append('comment',comment);
	sendingData.append('id_card',cardID);
	
	getJSON("/api/cards/commentCard", sendingData, data => {
		if (data.code == 1) {
			alert("Возникла ошибка!")
			return;
		}
		$$(".send-comment").value = "";
		let sendingData1 = new FormData();
		sendingData1.append('id', cardID);
		getJSON("/api/cards/getDetales", sendingData1, detales => {
			remove(".chat")
			$$(".comments-block").append(cDiv({class:"chat"}))
			detales.forEach(detale => {
					renderDetale(detale)
			});
		});

	});
}

if (window.location.pathname.split("/")[1] == "starter") {
	getMenu();
	getProjects();
}

if (window.location.pathname.split("/")[1] == "projects") {
	getMenu();
    let id_project = window.location.pathname.split("/")[2];
	if (id_project.length == 0) {
        window.location.replace("/404");
    }
    let id_role = $$("#dev-id-role").value;
    let id_user = $$("#dev-id-user").value;
    let id_status_ = $$("#dev-status").value;
    if (id_status_ == 4) {
    	$$(`#column-card option[value="done"]`).setAttribute("disabled","disabled")
    }
    if (id_status_ == 5) {
    	$$(`#column-card option[value="appointed"]`).setAttribute("disabled","disabled")
    }
    getProjectData()
}


function appendProject() {
	let sendingData = new FormData();
	sendingData.append('name', document.querySelector("#add-project-name").value);
	getJSON("/api/projects/append", sendingData, data => {
	    alert("Успешно добавлено!");
	    $("#appendProject").modal("hide");
	    getProjects();
  })
}
function appendProjectByCode() {
	let sendingData = new FormData();
	sendingData.append('code', document.querySelector("#code-project").value);
	getJSON("/api/projects/appendByCode", sendingData, data => {
		if (data.code == 0) {
	    	alert("Успешно присоединились!");
	    	getProjects();
		}
		if (data.code == 1) {
	    	alert("Вы уже в команде!");
	    	getProjects();
		}
		if (data.code == 2) {
	    	alert("Неверный код!");
		}
	    $("#appendProjectCode").modal("hide");
	    
  })
}

