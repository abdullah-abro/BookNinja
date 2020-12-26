const server = 'http://localhost:3000/';




document.addEventListener("DOMContentLoaded", () => {
    var btn_add_shelf = document.querySelector(".btn-add-shelf");
    var pop_up = document.querySelector("#popup_for_adding");
    var close_popup = document.querySelectorAll(".close_popup");
    var submit_shelf = document.querySelector("#submit_shelf");
    var delete_shelf = document.querySelectorAll(".delete_shelf");
    var go_to_shelf = document.querySelectorAll(".btn_go_to_shelf");
    var pop_up_go_to_shelf = document.querySelector("#pop_up_for_go_to_shelf");
    var close_popup_goToShelf = document.querySelectorAll(".close_popup_goToShelf")
    var edit_bio = document.querySelector(".edit_bio");
    var popup_bio = document.querySelector("#popup_bio");

    //go_to_shelf_pop_up_logic
    go_to_shelf.forEach(function (any) {


        any.addEventListener("click", function (e) {

            pop_up_go_to_shelf.style.display = "block";
            //new code i entered
            var shelf_name_in_popup = document.querySelector("#shelf_name_for_pop_up_go_to_shelf");
            shelf_name_in_popup.innerHTML = this.id;



            console.log(this.id);

            e.preventDefault();

            let user_id = document.querySelector('#user_id');
            let shelf_id = this.id;

            // var xhr = new XMLHttpRequest();
            // // xhr.open('POST', `${server}api/user/${parseInt(user_id.innerHTML)}/add_shelf`, true);
            // xhr.setRequestHeader("Content-Type", "application/json");

            // xhr.onload = function () {
            //     if (this.status == 200) {
            //         var obj_del_shelf = JSON.parse(this.responseText);
            //         //         console.log(obj_shelf);
            //         window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
            //         //         // if(login_status(users.status))
            //         //         // {
            //         //         //     console.log(users);
            //         //         // }
            //         //         // else 
            //         //         // {
            //         //         //     console.log(users);
            //         //         //    let x = document.querySelector("#login_check");

            //         //         //     x.innerHTML = "Incorrect username or password";
            //         //         // }
            //              }
            //          }

            //          var data = JSON.stringify({ "shelf_name": shelf_name.value });

            //          xhr.send(data);

        }
        )
    }
    );
    //go_to_shelf_pop_up_logic_End

    //





    //addShelf popupView
    btn_add_shelf.addEventListener("click", function () {
        pop_up.style.display = "block";
    }
    )


    //Deleting shelf eventlistener
    delete_shelf.forEach(function (any) {


        any.addEventListener("click", function (e) {
            console.log(this.id);
            e.preventDefault();

            let user_id = document.querySelector('#user_id');
            let shelf_id = parseInt(this.id);

            var xhr = new XMLHttpRequest();
            console.log(`${server}api/user/${parseInt(user_id.innerHTML)}/delete_shelf/${shelf_id}`);
            xhr.open('DELETE', `${server}api/user/${parseInt(user_id.innerHTML)}/delete_shelf/${shelf_id}`, true);
            // xhr.setRequestHeader("Content-Type", "application/json");

            xhr.onload = function () {
                if (this.status == 200) {
                    console.log("Response recieved");
                    window.location = `${server}user/${user_id.innerHTML}`;
                    // var obj_del_shelf = JSON.parse(this.responseText);
                    // //         console.log(obj_shelf);
                    // window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
                    //         // if(login_status(users.status))
                    //         // {
                    //         //     console.log(users);
                    //         // }
                    //         // else 
                    //         // {
                    //         //     console.log(users);
                    //         //    let x = document.querySelector("#login_check");

                    //         //     x.innerHTML = "Incorrect username or password";
                    //         // }
                }
            }

            // var data = JSON.stringify({ "shelf_name": shelf_name.value });

            xhr.send();



        }
        )
    }
    );


    // closing Addshelf Popup 
    close_popup.forEach(function (any) {


        any.addEventListener("click", function () {
            pop_up.style.display = "none";
        })
    }
    );

    //Closing go to shelf popup
    close_popup_goToShelf.forEach(function (any) {


        any.addEventListener("click", function () {
            pop_up_go_to_shelf.style.display = "none";
        })
    }
    );

    //event listener for adding shelf and sending request to server
    submit_shelf.addEventListener("click", e => {


        e.preventDefault();

        let user_id = document.querySelector('#user_id');
        let shelf_name = document.querySelector('#shelf_name');

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${server}api/user/${parseInt(user_id.innerHTML)}/add_shelf`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (this.status == 200) {
                var obj_shelf = JSON.parse(this.responseText);
                console.log(obj_shelf);

                window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
                // if(login_status(users.status))
                // {
                //     console.log(users);
                // }
                // else 
                // {
                //     console.log(users);
                //    let x = document.querySelector("#login_check");

                //     x.innerHTML = "Incorrect username or password";
                // }
            }
        }

        var data = JSON.stringify({ "shelf_name": shelf_name.value });

        xhr.send(data);

    });

    //popup opening and closing for adding bio
    edit_bio.addEventListener("click", function (e) {
        e.preventDefault();

        popup_bio.style.display = "block";

        
        //closing event listener
        let close_popup_bio = document.querySelectorAll(".close_popup_bio");

        close_popup_bio.forEach(function (any) {


            any.addEventListener("click", function () {
                popup_bio.style.display = "none";
            })
        }
        );
        

        //put request on submit bio buttion
        let submit_bio = document.querySelector("#submit_bio");
        submit_bio.addEventListener("click",function(e)
        {
            e.preventDefault();

            let new_bio = document.querySelector("#new_bio");
            let user_id = document.querySelector('#user_id');

            var xhr = new XMLHttpRequest();
        xhr.open('PUT', `${server}api/user/${parseInt(user_id.innerHTML)}/edit_bio`, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (this.status == 200) {
                var obj_shelf = JSON.parse(this.responseText);
                console.log(obj_shelf);

                window.location = `${server}user/${parseInt(user_id.innerHTML)}`;
                // if(login_status(users.status))
                // {
                //     console.log(users);
                // }
                // else 
                // {
                //     console.log(users);
                //    let x = document.querySelector("#login_check");

                //     x.innerHTML = "Incorrect username or password";
                // }
            }
        }

        var data = JSON.stringify({ "user_name": new_bio.value });

        xhr.send(data);


        }
        );



    });





});
