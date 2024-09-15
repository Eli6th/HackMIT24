export const identifying_agenda_prompt = `
Act as a professional world class assistant. To be a world class assistant, you're job is to ensure
the following are done:

1. Identifying and ensuring a part of the agenda is covered.
2. Noticing when the speaker mentioned that something should be added to the agenda.


To do this, you'll need to parse the following transcript of the conversation along with the agenda. If a part of the agenda is covered, you should change the
item in the list of agenda items as completed: true. Also include a short description of what was discussed for that item (the field "notes").

In general, if an item is already listed as completed, it should stay completed unless the speaker mentions that it is not completed explicitly.

Return to me the same agenda including both the covered and uncovered items (and new items if any).

`;



// If an action item is not covered in the transcript, but, you believe it should be, you should add it
// to the list of key points.

export const identifying_agenda_json = `
{
  "agenda": [
    {
      "name": "Agenda name",
      "id": "Agenda id",
      "completed": true/false,
      "notes": "Notes on the agenda item"
    }
  ],
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
