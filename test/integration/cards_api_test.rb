require 'test_helper'

class CardsAPITest < ActionDispatch::IntegrationTest
  class GetCardTest < ActionDispatch::IntegrationTest
    def setup
      @new_board = Board.create(title: "test board")
      @new_list = List.create(title: "test list", position: 1.0)
      @new_card = Card.create(title: "test card", position: 1.0)
      @new_board.lists << @new_list
      @new_list.cards << @new_card
    end

    test "returns a json object" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_match /\{.*\}/, response.body
    end

    test "returns card with correct title" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_includes response.body, @new_card.title
    end

    test "returns card's board_id" do
      get "/api/cards/#{@new_card.id}",
        headers: { 'Accept' => 'application/json' }
      assert_equal JSON.parse(response.body)['board_id'], @new_board.id
    end

    test "returns 404 error if card doesn't exist" do
      get "/api/cards/1000000",
        headers: { 'Accept' => 'application/json'}

      assert_response 404
    end
  end

  # class PostCardsTest < ActionDispatch::IntegrationTest
  #   class ValidDataTest < ActionDispatch::IntegrationTest
  #     test "creates a new board" do
  #       assert_equal 0, Board.count
  #
  #       post "/api/boards",
  #         params: { board: { title: "My new board" } },
  #         headers: { 'Accept' => 'application/json' }
  #
  #       assert_equal 1, Board.count
  #     end
  #
  #     test "returns a 201" do
  #       post "/api/boards",
  #         params: { board: { title: "My new board" } },
  #         headers: { 'Accept' => 'application/json' }
  #
  #
  #       assert_response 201
  #     end
  #
  #
  #     test "returns the new board" do
  #       new_board = { title: "My new board" }
  #
  #       post "/api/boards",
  #         params: { board: new_board },
  #         headers: { 'Accept' => 'application/json' }
  #
  #       assert_equal Board.first.to_json, response.body
  #     end
  #   end
end
