/* Create your schema here */
CREATE TABLE message (
  id SERIAL PRIMARY KEY,
  messagetext TEXT NOT NULL,
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  score INT NOT NULL DEFAULT 0,
  token TEXT NOT NULL
);

CREATE TABLE reply (
  id SERIAL PRIMARY KEY,
  messageid INT NOT NULL,
  replytext TEXT NOT NULL,  
  timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
  token TEXT NOT NULL,
  FOREIGN KEY (messageid) REFERENCES message(id)
);
