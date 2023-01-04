app.views['edit'] = `
  <h2>Add locations to your Map!</h2>
  <p>Click on the map to drop your marker at a filming location.</p>
  <form>
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="location-name">Location:</label>
          </td>
          <td>
            <input class="field" id="location-name" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="location-info">Description:</label>
          </td>
          <td>
            <input class="field" id="location-info" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="img-link">Image URL:</label>
          </td>
          <td>
            <input class="field" id="img-link" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>

        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

  <br>

  <div id="marker-view-panel">
    <input id="toggle-markers" type="button" value="Toggle Markers" />
  </div>

`
app.views['favoriteMaps'] = `
  <h2>My Favorite Maps</h2>
  <div id="fave-map-list"></div>

`
app.views['home'] = `<h2>Welcome to Movie Mapper</h2>
<p>list of all user map links here</p>
`
app.views['login'] = `
  <h2>Login Existing User</h2>

  <form action="/login" method="POST">
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="email">Email:</label>
          </td>
          <td>
            <input class="field" id="login-email" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="password">Password:</label>
          </td>
          <td>
            <input class="field" id="login-password" type="password" style="width: 200px; margin: .5em" />
          </td>
        </tr>


        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

  <h2>Register New User</h2>

  <form action="/register" method="POST">
    <div class="form">
      <table>
        <tr>
          <td class="label">
            <label for="email">Email:</label>
          </td>
          <td>
            <input class="field" id="login-email" type="text" style="width: 200px; margin: .5em" />
          </td>
        </tr>
        <tr>
          <td class="label">
            <label for="password">Password:</label>
          </td>
          <td>
            <input class="field" id="login-password" type="password" style="width: 200px; margin: .5em" />
          </td>
        </tr>


        <tr>
          <td></td>
          <td><button type="submit">Submit</button></td>
        </tr>


      </table>
    </div>
  </form>

`
app.views['myMaps'] = `
  <h2>My Created Maps</h2>
  <div id="my-map-list"></div>
`
app.views['newMap'] = `
  <h2>Create a new map!</h2>
  <p>Find an area to capture in the map on the right</p>
  <p>Zoom in/out and drag the map to create the boundaries for your markers!</p>
  <form id ="map-form">
    <div class="form">
      <table>
        <tr>
          <td class="label"><label for="map-title">Map Title:</label></td>
          <td><input class="field" id="map-title" type="text" name="title"></td>
        </tr>
        <tr>
          <td class="label"><label for="map-thumbnail">Map Thumbnail Link:</label></td>
          <td><input class="field" id="map-thumbnail" type="text" name="thumb"></td>
        </tr>
        <div class="error">
          <span><i class="fa-solid fa-triangle-exclamation"></i></span>
          <span class="error-message"></span>
          <span><i class="fa-solid fa-triangle-exclamation"></i></span>
        </div>
        <tr><td class="label"><button type="submit">Save New Map!</button></td></tr>
      </table>
    </div>
</form>

`
app.views['viewMap'] = `
  <h2>Current Map Title (needs to be injected)</h2>
  <p>Created by: Inject user</p>

`