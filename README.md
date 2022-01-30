# obs-foobar

OBS Plugin to display foobar2000 information

# Author

Original source code: https://github.com/farpenoodle/FB2KNowPlayingOverlay

Modified source code by tautheory

# Description

Displays information in an html file based on the current playing track in foobar2000. Modified to display when playing music and hide when music is paused. When foobar2000 is not running or nothing is playing (pressed Stopped), the widget will automatically fadeout and remain hidden. Once foobar2000 is running and music has started, the widget will fade back in.

# Usage

- Install foobar2000 (https://www.foobar2000.org/)
- Install `foobar_setup/foo_np_simple.dll` via foobar2000 by going to Preferences -> Components -> Install and selecting the dll
- Navigate to Preferences -> Tools -> Now Playing Simple and use `foobar_setup/foobar_plugin_settings.json` to populate the Formatting string textbox
- Refer to `foobar2000 settings.png` as a sample of what you should see
- In OBS, create a new Browser source and select `foobar_nowplaying.html`

# Customizing

- Widget Fadeout/Fadein length can be adjusted at the top of `nowPlaying.js` by modifying the variable `fadeLength`, which is measured in seconds

# Changelog
