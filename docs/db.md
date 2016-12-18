

User Schema
  - Parent
  - Church/Group
  - believer (boolean)
  - status (enum)['red', 'yellow', 'green']
  - baptised
  - leader (range)[1-5]
  - contact info
    - Address
    - First name
  - knowledge modules (could be complex, perhaps in seperate table)
    - Trainer
    - Assisted
    - Modeled To
    - Exposure
    - Teach It
    - (Maybe needs more fleshing out)

User Experience
  - Signup process
  - Login Process
  - Training checklist
  - Reaching segments experience

Needs explaination
  - Segment
    - Segment by org, church, demographics (Ministries, nursing homes, businesses, blue/white collar, students, homeless, apartment complex)

Church Schema
  - Link to users
  - Foundation Amount
  - Healthy Church Checks
    - Fellowship (<3)
    - Worship
    - Giving
    - Lords Supper
    - Time in the Word
    - Prayer
    - Leadership
    - Gospel/Discipleship
    - Baptism

## MVP Generation Mapping

  Church
    - Display Name
    - Users
    - Healthy Church Checks

  User
    - Churches
    - Parent
    - Children
    - Display Name
    - Invite Code