# hckthn
activation streams, session summary api, guides and surveys
```mermaid
sequenceDiagram
    participant Web as Website
    participant FS as Fullstory
    participant GCF as Google Cloud Function
    participant Twilio as Twilio

    Note over Web, FS: Path 1: Activation Flow
    Web->>FS: Customer Event (Wire Transfer)
    par UI Update & Data Activation
        FS->>GCF: Activation Stream
        FS-->>Web: Guides "Contact You Soon" Modal
    end
    GCF->>Twilio: SMTP/SMS SDK
    Twilio->>Recipient: Email & Text Delivered

    Note over Web, FS: Path 2: Data Retrieval Flow
    par UI Update
        Web->>FS: Query Session Summary API
        FS-->>Web: Return Session Data
    end
    Web->>Web: Update UI with Session Insights
