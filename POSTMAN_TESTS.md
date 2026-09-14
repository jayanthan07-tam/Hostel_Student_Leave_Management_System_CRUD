# Postman Test Cases

Base URL:

```text
http://127.0.0.1:8000/api/leaves/
```

## Create - POST

Body:

```json
{
  "student_name": "Jayanthan P",
  "register_no": "23CSBS001",
  "department": "CSBS",
  "year": 2,
  "from_date": "2026-09-14",
  "to_date": "2026-09-15",
  "reason": "Family function",
  "status": "Pending"
}
```

Expected result: HTTP 201.

## Read All - GET

```text
GET /api/leaves/
```

Expected result: HTTP 200 and JSON list.

## Read One - GET

```text
GET /api/leaves/1/
```

Expected result: HTTP 200 for valid ID.

## Update - PATCH

```json
{
  "status": "Approved"
}
```

Expected result: HTTP 200.

## Delete - DELETE

```text
DELETE /api/leaves/1/
```

Expected result: HTTP 204.

## Validation Tests

Try:
- Empty student name
- Empty register number
- Year outside 1–4
- To date earlier than from date
- Invalid status
