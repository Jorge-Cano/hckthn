# hckthn
activation streams, session summary api, guides and surveys
```mermaid
sequenceDiagram
    participant Web as GitHub Hosted Website
    participant FS as Fullstory
    participant GCF as Google Cloud Function
    participant SMTP/SMS as SMTP/SMS

    Note over Web, FS: Path 1: Activation Flow
    Web->>FS: Customer Event (Wire Transfer)
    FS-->>GCF: Activation Stream
    par UI Update
        FS->>Web: (Guides) Trigger UI Change
    end
    GCF->>SMTP/SMS: Trigger Activation SMTP/SMS

    Note over Web, FS: Path 2: Data Retrieval Flow
    Web->>FS: Query Session Summary API
    FS-->>Web: Return Session Data
    Web->>Web: Update UI with Session Insights
