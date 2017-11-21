#include <iostream>
#include "readIntoArray.hpp"

int main( int argc, char* argv[] ) {
  --argc;

  if ( argc <= 3 ) {
    std::cerr << "Usage: ./genRandCSV ( Num Rows ) ( Rand Start ) ( Table Name ) ( File 1 ) ( File 2 ) ... ( File N )\n";

    return 1;
  }

  int NUM_ROWS = std::stoi( std::string( argv[1] ) );
  int RAND_START = std::stoi( std::string( argv[2] ) );
  std::string table ( argv[3] );
  std::string beg ( "INSERT INTO " );
  std::string beg2 ( " VALUES ( '" );
  std::string sep ( "', '" );
  std::string end ( "' );" );

  srand( time( NULL ) );

  std::vector< std::vector< std::string > > lists;
  std::vector< std::string > list;

  for ( int i = 4; i <= argc; i++ ) {
    if ( ( list = readIntoArray( argv[i] ) ).empty() ) {
    std::cerr << "Could not read files!\n";

    return 1;
    }
    lists.push_back( list );
  }

  std::vector< std::vector< std::string > >::iterator itr =
    lists.begin();

  std::vector< std::string >::iterator itr2;

  int col_num = 0;

  for ( int i = 0; i < NUM_ROWS; i++ ) {
    col_num = 0;
    itr = lists.begin();

    std::cout << beg << table << beg2;

    for ( ; itr != lists.end(); itr++ ) {
      if ( col_num > 0 ) {
        std::cout << sep;
      }

      if ( col_num < RAND_START ) {
        if ( itr->size() - 1 <= i ) {
          std::cout << itr->at( itr->size() - 2 );
        }
        else {
          std::cout << itr->at( i );
        }
      }
      else {
        std::cout << itr->at( rand() % ( itr->size() - 1 ) );
      }

      ++col_num;
    }

    std::cout << end;

    std::cout << "\n";
  }

  return 0;
}
