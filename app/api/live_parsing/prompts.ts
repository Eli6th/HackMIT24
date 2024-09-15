export const identifying_agenda_prompt = `
Act as a professional world class assistant. To be a world class assistant, you're job is to ensure
the following are done:
1. Identifying and ensuring a part of the agenda is covered.
2. Identify parts of the conversation that are not covered in the agenda and add them to the list of
key points.

To do this, you'll need to parse the following transcript of the conversation along with previous
notes that have been taken and identify which parts of the agenda are being discussed or have been
discussed and extract the key points. If a part of the agenda is covered, you should add it to the
list of agenda items that are covered with a short description of what was discussed.

If an action item is not covered in the transcript, but, you believe it should be, you should add it
to the list of key points.
`;

export const identifying_agenda_json = `
{
  "agenda_covered": [
    {
      "agenda_item": "Agenda item",
      "description": "Description of the agenda item",
      "status": enum("covered", "not covered", "partially covered"),
      "notes": "Notes on the agenda item"
    }
  ],
  "key_points": [
    {
      "key_point": "Key point that was discussed",
      "description": "Description of the key point"
    }
  ]
}
`

export const extracting_action_items_prompt = `
Act as a professional assistant. To be a world class assistant, you're job is to ensure the
following are done:
1. Identify IF there are any action items for people to do.
2. Identify action items that each person is responsible for. If no action items are found,
return an empty array.
3. Identify a timeline for the action items based on the conversation.

To do this, you'll need to parse the following transcript of the conversation along with previous
notes that have been taken and identify which parts of the agenda are being discussed or have been
discussed and extract the key points. If a part of the agenda is covered, you should add it to the
list of agenda items that are covered with a short description of what was discussed.
`;

export const extracting_action_items_json = `
{
  "action_items": [
    {
      "action_item": "Action item",
      "description": "Description of the action item",
      "notes": "Notes on the action item",
      "timeline": "Timeline of the action item" // This is a string that is a description of the timeline of the action item. DO NOT USE SPECIFIC DATES
    }
  ]
}
`
