# hckthn
activation streams, session summary api, guides and surveys
```mermaid
sequenceDiagram
    participant Web as GitHub Hosted Website
    participant FS as Fullstory
    participant GCF as Google Cloud Function
    participant Email as Email Service (SMTP/SendGrid)

    Note over Web, FS: Path 1: Activation Flow
    Web->>FS: Customer Event (Big Whale Action)
    FS-->>GCF: Activation Streaming Webhook
    par UI Update
        GCF->>Web: Trigger UI Change (via Socket/API)
    and Notification
        GCF->>Email: Trigger Activation Email
    end

    Note over Web, FS: Path 2: Data Retrieval Flow
    Web->>FS: Query Session Summary API
    FS-->>Web: Return Session Data
    Web->>Web: Update UI with Session Insights
