class Card < ApplicationRecord
  validates_presence_of :title, :list_id

  belongs_to :list
  has_many :labelizations
  has_many :labels, through: :labelizations
  has_many :comments
end
