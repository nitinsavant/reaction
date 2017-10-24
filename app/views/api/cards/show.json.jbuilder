json.merge! @card.attributes
json.labels @card.labels.map(&:color)
json.archived false
json.completed false
json.board_id @card.list.board_id
json.comments_count 2
json.comments []
json.actions []
