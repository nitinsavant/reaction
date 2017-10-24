class Comment < ApplicationRecord
  validates_presence_of :body, allow_blank: false

  belongs_to :card
end
