#include <iostream>
#include "genRandInput.hpp"

int main( int argc, char* argv[] ) {
  --argc;

  if ( argc != 5 ) {
    std::cerr << "Usage: ./genRandInput ( names file ) ( preference file ) ( categories file ) ( Table Name ) ( Number of Rows )\n";

    return 1;
  }

  srand( time( NULL ) );

  std::string strBeg = "INSERT INTO ";
  std::string strTable = argv[4]; 
  std::string strBeg2 = " VALUES ('";
  std::string str;
  std::string strSep = "', '";
  std::string strEnd = "');\n";

  std::vector<std::string> names = readIntoArray( argv[1] );
  std::vector<std::string> prefs = readIntoArray( argv[2] );
  std::vector<std::string> cats = readIntoArray( argv[3] );

  for ( int i = 0; i < std::stoi( std::string (argv[5]) ); i++ ) {
    std::cout << strBeg << strTable << strBeg2 <<
        names.at( rand() % ( names.size() - 1 ) ) << strSep <<
        prefs.at( rand() % ( prefs.size() - 1 ) ) << strSep <<
        cats.at( rand() % ( cats.size() - 1 ) ) << strEnd;
  }
  /*
  std::vector<std::string>::iterator itr = list.begin();
  for ( ; itr  != list.end(); itr++ ) {
    std::cout << *itr;
  }

  std::vector<std::string>::iterator itr2 = prefs.begin();
  for ( ; itr2  != prefs.end(); itr2++ ) {
    std::cout << *itr2;
  }

  std::vector<std::string>::iterator itr3 = cats.begin();
  for ( ; itr3  != cats.end(); itr3++ ) {
    std::cout << *itr3;
  }
  */

  return 0;
}
