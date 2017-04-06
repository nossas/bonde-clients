-- Copyright (c) 2015-present, Facebook, Inc.
-- All rights reserved.
--
-- This source code is licensed under the BSD-style license found in the
-- LICENSE file in the root directory of this source tree. An additional grant
-- of patent rights can be found in the PATENTS file in the same directory.

on run argv
  set theURL to item 1 of argv

  tell application "Chrome"

    if (count every window) = 0 then
      make new window
    end if

    -- Find a tab currently running the debugger
    set found to false
    set theTabIndex to -1
    repeat with theWindow in every window
      set theTabIndex to 0
      repeat with theTab in every tab of theWindow
        set theTabIndex to theTabIndex + 1

        -- Find by tab URL regex match
        set tabURL to theTab's URL as string
        set escaped to do shell script "echo '" & theURL & "' | sed 's/\\//\\\\\\//g'"
        set regex to "echo '" & tabURL & "' | sed 's/.*" & escaped & ".*/*match*(&)/'" as string
        set execShell to do shell script regex
        set match to execShell starts with "*match*"

        if match then
          set found to true
          exit repeat
        end if
      end repeat

      if found then
        exit repeat
      end if
    end repeat

    if found then
      tell theTab to reload
      set index of theWindow to 1
      set theWindow's active tab index to theTabIndex
    else
      tell window 1
        activate
        make new tab with properties {URL:theURL}
      end tell
    end if
  end tell
end run
