const signOutListener = () => {
  $(".g-signout2").click(signOut);
  $('.g-signin2').show();
  $('.profile').hide();
}

window.onSignIn = (googleUser) => {
  let profile = googleUser.getBasicProfile();
  let id_token = googleUser.getAuthResponse().id_token;
  createUser(profile, id_token);
  $('.g-signin2').hide()
  $('.g-signout2').show()
  $('.profile').show()
}

const signOut = () => {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() =>  {
    console.log('User signed out.');
    localStorage.clear();
  });
}

const createUser = (profile, id_token) => {
  let body = { user: { name: profile.getName(),
      email: profile.getEmail(),
      token: id_token
    } };
  fetch('https://fathomless-plateau-58961.herokuapp.com/api/v1/users', {
    method: 'POST',
    headers: { 'Accept': 'application/json',
      'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .then(myJson => {
      let user = myJson.id
      storeUser(user)})
    .catch(error => console.error(error))
};

const storeUser = (id) => {
  localStorage.setItem('user_id', id)
}

module.exports = {onSignIn, signOutListener}
