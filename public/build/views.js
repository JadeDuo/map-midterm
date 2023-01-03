const editView = `<div class="side-content">
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

</div>
`
const favoriteMapsView = `<div class="side-content">
  <h2>My Favorite Maps</h2>
  <p>list of map links here</p>
</div>
`
const loginView = `<div class="side-content">
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
</div>
`
const myMapsView = `<div class="side-content">
  <h2>My Created Maps</h2>
  <p>list of map links here</p>
</div>
`
const newMapView = `<div class="side-content">
  <h2>Create a new map!</h2>
  <p>Zoom in/out and drag the map to create the boundaries for your markers!</p>
  <form action="/maps" method="POST">
    <div class="form">
      <table>
        <tr>
          <td class="lable">
            <label for="map-title">Title:</label>
          </td>
          <td>
            <input class="field" id="map-title" type="text" style="width: 200px; margin: 1em" />
          </td>
        </tr>
        <tr>
          <td><button type="submit">Submit</button></td>
        </tr>

      </table>
    </div>
  </form>
</div>
`
const viewMapView = `<div class="side-content">
  <h2>Current Map Title (needs to be injected)</h2>
  <p>Created by: Inject user</p>
</div>
`