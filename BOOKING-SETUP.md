# Appointment booking activation

Status (27 October 2026): booking page deployed. Abhishek Mahala’s active 30-minute Google Meet event is connected at https://calendly.com/expertsinvesto/30min. The Calendly API returned available slots. Ajay’s calendar remains unconnected. Existing general contact and private enquiry forms are preserved.

In the authenticated Calendly event settings, the immediate calendar invitation was already enabled; email reminders were enabled for 24 hours before, and email follow-up was enabled for one hour after. The settings were saved and verified in the editor. No paid upgrade was purchased. No test appointment was created, so actual inbox delivery and cancellation/rescheduling behavior remain untested. The account currently lists only Abhishek as an organization member. Do not route Ajay’s bookings to Abhishek’s calendar.

## Account setup required

1. Create a hosted scheduling account on Cal.com or Calendly for each participating advisor (Ajay Singh Mahala and Abhishek Mahala). Select a plan whose actual features and price meet your needs; do not assume automated reminders are free.
2. Each advisor connects their real Google/Outlook calendar using the provider’s secure authorization screen. Enable conflict checking on all relevant calendars and select the destination calendar for new appointments. Do not share passwords or tokens in chat or source files.
3. Create a **30-minute** event for each advisor. Confirm working hours, Asia/Kolkata default time zone, holidays, notice period, booking horizon, buffers, meeting location/video service and cancellation policy with the advisor. Do not publish guessed office hours.
4. Require attendee name and email. Keep phone optional unless operationally necessary. Do not request financial documents or account identifiers. Configure the provider’s applicable privacy terms.
5. Enable automatic confirmation with meeting details and cancellation/rescheduling links. Configure reminder emails (suggested: 24 hours and 1 hour before) and an after-meeting follow-up (suggested: 24 hours after). These are proposed timings, not active automations. Check late-booking, cancelled-event and rescheduled-event behavior in the provider. Avoid marketing content without appropriate consent.
6. Paste each public event URL into its advisor’s `bookingUrl` in `booking-config.js`. Supported hosts are exactly `cal.com` and `calendly.com`; event links must include account and event paths. Custom domains require an explicit code review before allowlisting. No API credentials are required by this static site.

## Acceptance checks before launch

- Confirm the event duration in the scheduling account: the website does not enforce provider-side duration.
- Make two test bookings for the same time from separate sessions. Only one should succeed. Check the meeting appears on the advisor’s calendar and disappears from available slots.
- Test time-zone conversion, busy times, holidays, minimum notice and buffers.
- Verify real confirmation delivery, meeting links, 24-hour/1-hour reminders and follow-up delivery. Test events booked inside a reminder window.
- Cancel and reschedule; check old reminders are removed and the correct new confirmations/reminders are sent.
- Check each hosted calendar embeds correctly on desktop/mobile. If blocked, the visible “Open calendar in a new tab” link provides an alternative. An iframe load event is not evidence of booking success.
- Test provider outage, JavaScript disabled and missing/invalid booking links. Contact options must remain usable.
- Verify keyboard navigation and screen-reader announcements. No scheduling provider is contacted until the visitor chooses a configured advisor.

## Files and boundaries

`book-consultation.html`, `booking.css`, `booking.js`, `booking-config.js`. Existing booking-labelled links lead to the new page; ordinary Contact links are unchanged. The provider owns calendar conflict checking, persistence, notifications, cancellations and rescheduling. This page never sends emails or stores appointments in browser storage. Public hosted event URLs are safe to commit; API keys are not.

Provider references: https://cal.com/features/embed and https://cal.com/features/workflows. Enable and verify all required workflows in the chosen account before describing them as active.


Update: the business explicitly requested the same email for Ajay. Both advisor cards now use the existing shared 30-minute event and account (expertsinvesto@gmail.com). Advisor choice is pre-filled into the first custom question via Calendly a1. The hosted page identifies the account owner as Abhishek; this is a shared calendar, not separate advisor availability. The website explains this. Booking notes are editable by the attendee.
