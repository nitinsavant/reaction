json.merge! @card.attributes
json.labels @card.labels.map(&:color)
json.board_id @card.list.board_id
json.comments_count @card.comments.size
json.comments @card.comments do |comment|
  json.text comment.body
end
json.actions []
