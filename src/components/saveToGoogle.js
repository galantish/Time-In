
  
export function saveToCalendar(title, content, range, calendarId){
  const event = {
      'summary': title,
      'location': "Sheinkin St 58, Giv'atayim",
      'description': content,
      'start': {
        'dateTime': range.start,
      },
      'end': {
        'dateTime': range.end,
      },
      'attendees': [
        {'email': 'intimeproject2018@gmail.com'}
      ],
      'reminders': {
        'useDefault': true
      }
  };

  let request = window.gapi.client.calendar.events.insert({
      'calendarId': calendarId,
      'resource': event
  });
    
  request.execute(function(event) {
      console.log(event)
  });
}