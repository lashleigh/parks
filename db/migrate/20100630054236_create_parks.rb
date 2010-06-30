class CreateParks < ActiveRecord::Migration
  def self.up
    create_table :parks do |t|
      t.string :name
      t.string :site_url
      t.string :image_url
      t.float :latitude
      t.float :longitude
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :parks
  end
end
