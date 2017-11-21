#include <iostream>
#include "testReadIntoArray.hpp"

int main( int argc, char* argv[] ) {
  --argc;

  if ( argc != 1 ) {
    std::cerr << "Usage: ./rmComments ( input file )\n";

    return 1;
  }

  std::vector<std::string> list = readIntoArray( argv[1] );

  std::vector<std::string>::iterator itr = list.begin();
  for ( ; itr  != list.end(); itr++ ) {
    std::cout << *itr;
  }

  return 0;
}
