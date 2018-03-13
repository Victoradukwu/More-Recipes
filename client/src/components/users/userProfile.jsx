

  <div class="container">
    <div class="row">
      <div class="offset-lg-4 col-lg-4 col-sm-6 col-12 main-section text-center">
          <div class="row">
              <div class="col-lg-12 col-sm-12 col-12 profile-header"></div>
          </div>
          <div class="row user-detail">
              <div class="col-lg-12 col-sm-12 col-12">
                  <img src={user.profilePicture} class="rounded-circle img-thumbnail">
                  <h5>{user.name}</h5>
                  <p><i class="fa fa-map-marker" aria-hidden="true">{user.location}</i></p>

                  <hr>
                  Date joined: {user.createdAt} <br/>
                  Number of recipes contributed:     <br/>  

                  <hr>
                  <span>Lorem ips consectetur adipisium ,eiusmod tempor incididuin reprehendeanim.</span>
              </div>
          </div>
          <div class="row user-social-detail">
              <div class="col-lg-12 col-sm-12 col-12">
               <span class = "fa fa-phone"> 08012345678 </span>
               <span class = "fa fa-envelope"> recipes@andela.com</span>               
              </div>
          </div>
      </div>
    </div>
  </div>
