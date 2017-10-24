class AddCompletedArchivedToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :completed, :boolean
    add_column :cards, :archived, :boolean
  end
end
