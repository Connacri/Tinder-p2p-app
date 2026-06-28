## 2026-06-28 - [P2P Delta Protocol & Rendering Optimization]
**Learning:** P2P applications without persistent IDs lose their social graph on every refresh. Re-rendering the entire chat history on every message (O(n) DOM operations) is a major performance bottleneck for long-lived conversations. Serializing the entire match database to localStorage on every message is inefficient (O(n) storage I/O).
**Action:** Implement persistent Peer IDs via seeds, delta rendering using insertAdjacentHTML, and incremental storage to optimize both runtime and loading performance.
