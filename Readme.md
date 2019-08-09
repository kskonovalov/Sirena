# Sirena

Demo: [kskonovalov.me/samples/sirena/](http://kskonovalov.me/samples/sirena/)

This app was created to help view and count money of sold tickets for accounting.

It uses api to get data, i used [MockApi](https://www.mockapi.io) to get some sample data.

The app create a request to api when changing **date** or **count** of entries to load.

It can count total sum of money, or count total sum of **highlighted** items money. **Highlighted** is just a flag, or can be computed depends of current data item.

App allow to **show** or **hide** table's columns.

**Limit**, **date**, **visible table columns** values stored in cookies, and when you refresh the page, they applies.

##

**Tech stack used:** CRA, Bootstrap, react-cookie, react-datepicker.

**I also used**: eslint with airbnb rules, prettier